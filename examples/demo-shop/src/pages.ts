import type { CheckoutSession, CheckoutStatus, Problem } from './gateway.ts'
import { PRODUCTS, QUICK_EXPIRY_MINUTES } from './shop.ts'
import type { Product } from './shop.ts'

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, (character) => ESCAPES[character] ?? character)
const formatPrice = (amount: number): string => `BHD ${amount.toFixed(3)}`

const STYLES = `
  * { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui, sans-serif; color: #1f2933; background: #f6f7f9; line-height: 1.5; }
  header { background: #fff; border-bottom: 1px solid #e3e6ea; }
  header div, main { max-width: 56rem; margin: 0 auto; padding: 1rem; }
  header div { display: flex; justify-content: space-between; gap: 1rem; }
  header a { color: inherit; text-decoration: none; font-weight: 600; margin-inline-start: 1rem; }
  .grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); }
  .card { background: #fff; border: 1px solid #e3e6ea; border-radius: 0.5rem; padding: 1rem; }
  .card.PAID { border-inline-start: 4px solid #039855; }
  .card.CANCELLED, .card.EXPIRED, .card.error { border-inline-start: 4px solid #b42318; }
  .muted { color: #667085; font-size: 0.875rem; }
  button, .button { display: inline-block; border: 1px solid #1d4ed8; background: #1d4ed8; color: #fff; padding: 0.5rem 0.875rem;
    border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; }
  button.danger { background: #fff; border-color: #b42318; color: #b42318; }
  .scroll { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #e3e6ea; }
  th, td { text-align: start; padding: 0.625rem; border-bottom: 1px solid #e3e6ea; font-size: 0.875rem; white-space: nowrap; }
  td form { display: inline; }
`

const page = (title: string, content: string): string => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} · Souq Sample Shop</title>
  <style>${STYLES}</style>
</head>
<body>
  <header><div><strong>Souq Sample Shop</strong><nav><a href="/">Products</a><a href="/orders">Orders</a></nav></div></header>
  <main>${content}</main>
</body>
</html>`

const productCard = (product: Product): string => `
  <form class="card" method="post" action="/buy">
    <h2>${escapeHtml(product.name)}</h2>
    <p class="muted">${escapeHtml(product.description)}</p>
    <p><strong>${formatPrice(product.price)}</strong></p>
    <input type="hidden" name="productId" value="${escapeHtml(product.id)}">
    <p><label><input type="checkbox" name="quickExpiry" value="true"> Expire in ${String(QUICK_EXPIRY_MINUTES)} minute</label></p>
    <button type="submit">Pay with Digital Wallet</button>
  </form>`

export const productsPage = (): string => page('Products', `<h1>Products</h1><div class="grid">${PRODUCTS.map(productCard).join('')}</div>`)

const orderAction = (session: CheckoutSession, name: 'cancel' | 'refund', label: string): string =>
  `<form method="post" action="/orders/${encodeURIComponent(session.id)}/${name}"><button class="danger">${label}</button></form>`

const actionsFor = (session: CheckoutSession): string => {
  if (session.status === 'PENDING') {
    return `<a class="button" href="${escapeHtml(session.checkoutUrl)}">Pay</a> ${orderAction(session, 'cancel', 'Cancel')}`
  }
  return session.status === 'PAID' ? orderAction(session, 'refund', 'Refund') : ''
}

const orderRow = (session: CheckoutSession): string => `
  <tr>
    <td>${escapeHtml(session.orderReference)}</td>
    <td>${escapeHtml(session.description ?? '')}</td>
    <td>${formatPrice(session.amount)}</td>
    <td><strong>${session.status}</strong></td>
    <td>${actionsFor(session)}</td>
  </tr>`

export const ordersPage = (sessions: readonly CheckoutSession[]): string =>
  page(
    'Orders',
    `<h1>Orders</h1>
     <p class="muted">The orders placed from this browser, with the status the gateway reports right now.</p>
     <div class="scroll"><table>
       <thead><tr><th>Order</th><th>Product</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
       <tbody>${sessions.map(orderRow).join('')}</tbody>
     </table></div>`,
  )

const OUTCOMES: Record<CheckoutStatus, [heading: string, message: string]> = {
  PAID: ['Payment received', 'Thank you. Your order is confirmed and will be prepared now.'],
  PENDING: ['Payment not completed', 'We have not received your payment yet. You can pay from the orders page.'],
  CANCELLED: ['Payment cancelled', 'This payment was cancelled. Nothing was charged.'],
  EXPIRED: ['Payment expired', 'The payment was not completed in time. Please order again.'],
  REFUNDED: ['Payment refunded', 'This order was refunded to your wallet.'],
}

export const resultPage = (session: CheckoutSession): string => {
  const [heading, message] = OUTCOMES[session.status]
  return page(
    heading,
    `<div class="card ${session.status}">
       <h1>${heading}</h1>
       <p>${message}</p>
       <p class="muted">Order ${escapeHtml(session.orderReference)} · ${formatPrice(session.amount)}</p>
       <a class="button" href="/orders">View orders</a>
     </div>`,
  )
}

export const problemPage = (problem: Problem): string =>
  page(
    'Payment problem',
    `<div class="card error">
       <h1>We could not complete this step</h1>
       <p>${escapeHtml(problem.detail)}</p>
       <p class="muted">The gateway answered ${String(problem.status)} with code ${escapeHtml(problem.code)}.</p>
       <a class="button" href="/orders">View orders</a>
     </div>`,
  )

export const notFoundPage = (): string =>
  page('Not found', '<div class="card error"><h1>Page not found</h1><a class="button" href="/">Back to products</a></div>')
