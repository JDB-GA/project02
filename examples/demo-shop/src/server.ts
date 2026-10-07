import { createServer } from 'node:http'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { GatewayError, SIGNATURE_HEADER, gateway, isValidSignature } from './gateway.ts'
import type { CallbackEvent } from './gateway.ts'
import { notFoundPage, ordersPage, problemPage, productsPage, resultPage } from './pages.ts'
import { PRODUCTS, QUICK_EXPIRY_MINUTES, config, newOrderReference } from './shop.ts'

const MAX_BODY_BYTES = 100_000
const MAX_ORDERS = 10
const ORDERS_COOKIE = /(?:^|;\s*)orders=([^;]*)/
const SESSION_ID = /^[0-9a-f-]{36}$/
const ORDER_ACTION = /^\/orders\/([^/]+)\/(cancel|refund)$/
const SHOP_PROBLEM = { status: 500, code: 'SHOP_ERROR', detail: 'The shop could not reach the payment gateway.' }

const readBody = async (request: IncomingMessage): Promise<string> => {
  const chunks: Buffer[] = []
  let size = 0
  for await (const chunk of request) {
    const buffer = chunk as Buffer
    size += buffer.length
    if (size > MAX_BODY_BYTES) {
      throw new Error('Request body is too large')
    }
    chunks.push(buffer)
  }
  return Buffer.concat(chunks).toString('utf8')
}

const sendHtml = (response: ServerResponse, status: number, html: string): void => {
  response.writeHead(status, {
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'",
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    'Cache-Control': 'no-store',
  })
  response.end(html)
}

const redirect = (response: ServerResponse, location: string): void => {
  response.writeHead(303, { Location: location }).end()
}

const readOrderIds = (request: IncomingMessage): string[] =>
  (ORDERS_COOKIE.exec(request.headers.cookie ?? '')?.[1] ?? '').split('.').filter((id) => SESSION_ID.test(id))

const saveOrderIds = (response: ServerResponse, orderIds: string[]): void => {
  const secure = config.shopUrl.startsWith('https://') ? '; Secure' : ''
  const value = orderIds.slice(0, MAX_ORDERS).join('.')
  response.setHeader('Set-Cookie', `orders=${value}; Path=/; Max-Age=604800; HttpOnly; SameSite=Lax${secure}`)
}

const buy = async (request: IncomingMessage, response: ServerResponse, orderIds: string[]): Promise<void> => {
  const form = new URLSearchParams(await readBody(request))
  const product = PRODUCTS.find((candidate) => candidate.id === form.get('productId'))
  if (!product) {
    sendHtml(response, 404, notFoundPage())
    return
  }
  const session = await gateway.createSession({
    orderReference: newOrderReference(),
    amount: product.price,
    description: product.name,
    returnUrl: `${config.shopUrl}/orders/complete`,
    expiresInMinutes: form.get('quickExpiry') === 'true' ? QUICK_EXPIRY_MINUTES : undefined,
  })
  saveOrderIds(response, [session.id, ...orderIds])
  redirect(response, session.checkoutUrl)
}

const showOrders = async (response: ServerResponse, orderIds: string[]): Promise<void> => {
  sendHtml(response, 200, ordersPage(await Promise.all(orderIds.map(gateway.getSession))))
}

const receiveCallback = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
  const body = await readBody(request)
  const signature = request.headers[SIGNATURE_HEADER]
  if (!config.signingSecret || !isValidSignature(config.signingSecret, body, typeof signature === 'string' ? signature : undefined)) {
    response.writeHead(401).end()
    return
  }
  const callback = JSON.parse(body) as CallbackEvent
  console.log(`callback ${callback.event} for ${callback.orderReference}: ${callback.status}`)
  response.writeHead(200).end()
}

const route = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
  const url = new URL(request.url ?? '/', config.shopUrl)
  const endpoint = `${request.method ?? 'GET'} ${url.pathname}`
  const orderIds = readOrderIds(request)
  if (endpoint === 'GET /') return sendHtml(response, 200, productsPage())
  if (endpoint === 'POST /buy') return buy(request, response, orderIds)
  if (endpoint === 'GET /orders') return showOrders(response, orderIds)
  if (endpoint === 'POST /webhooks/wallet') return receiveCallback(request, response)
  const orderAction = request.method === 'POST' ? ORDER_ACTION.exec(url.pathname) : null
  const sessionId = orderAction?.[1] ?? url.searchParams.get('sessionId') ?? ''
  const isResult = endpoint === 'GET /orders/complete'
  if ((!isResult && !orderAction) || !orderIds.includes(sessionId)) return sendHtml(response, 404, notFoundPage())
  if (isResult) return sendHtml(response, 200, resultPage(await gateway.getSession(sessionId)))
  await (orderAction?.[2] === 'refund' ? gateway.refundSession(sessionId) : gateway.cancelSession(sessionId))
  redirect(response, '/orders')
}

createServer((request, response) => {
  route(request, response).catch((error: unknown) => {
    const rejected = error instanceof GatewayError
    if (!rejected) {
      console.error(error)
    }
    sendHtml(response, rejected ? 502 : 500, problemPage(rejected ? error.problem : SHOP_PROBLEM))
  })
}).listen(config.port, () => {
  console.log(`Souq Sample Shop is running at ${config.shopUrl}`)
})
