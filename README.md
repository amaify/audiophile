# Audiophile

### An e-commerce store for your sound needs.

## Getting started

> Setting up the client-side server (NextJS 14 App router).
#### Run
- `cd app`
- `yarn install or pnpm install or npm install (Depending on your package manager)`
- `yarn dev`

The client side was build using NextJS 14 App router. It's a basic application where users can:

- Add/remove items from cart.
- make payment to the store via `stripe`
- Receive emails after a successful transaction.
  > The received emails are in two categories:
  > - Card payment: Users will get a confirmation of their order that contains the order summary and it lets them know their order is on the way.
  > - Cash payment: Users will receive a confirmation of their order, informing them that the order will be shipped after payment is confirmed.

## Live links
- Client-side app: https://tobe-audiophile.vercel.app