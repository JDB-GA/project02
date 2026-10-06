export const NOTIFICATION_ENDPOINTS = {
  stream: "/api/notifications/stream",
} as const;

export const NOTIFICATION_EVENTS = {
  moneyReceived: "money-received",
  paymentRequested: "payment-requested",
  paymentRequestUpdated: "payment-request-updated",
} as const;