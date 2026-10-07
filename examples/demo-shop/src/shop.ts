import { randomUUID } from 'node:crypto'
import { existsSync } from 'node:fs'

if (existsSync('.env')) {
  process.loadEnvFile('.env')
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
}

const requiredApiKey = (): string => {
  const apiKey = process.env.WALLET_API_KEY
  if (!apiKey) {
    throw new Error('Set WALLET_API_KEY before starting the shop. See .env.example.')
  }
  return apiKey
}

const port = Number(process.env.PORT ?? 4000)

export const config = {
  port,
  shopUrl: (process.env.SHOP_URL ?? `http://localhost:${String(port)}`).replace(/\/+$/, ''),
  apiUrl: (process.env.WALLET_API_URL ?? 'http://localhost:8080').replace(/\/+$/, ''),
  apiKey: requiredApiKey(),
  signingSecret: process.env.WALLET_SIGNING_SECRET ?? null,
} as const

export const QUICK_EXPIRY_MINUTES = 1

export const PRODUCTS: readonly Product[] = [
  { id: 'coffee-beans', name: 'Arabic coffee beans', description: '250 g, medium roast', price: 3.5 },
  { id: 'dates-box', name: 'Khalas dates box', description: '1 kg gift box', price: 6.25 },
  { id: 'saffron', name: 'Saffron threads', description: '2 g, grade A', price: 4.8 },
]

export const newOrderReference = (): string => `SHOP-${randomUUID().slice(0, 8).toUpperCase()}`
