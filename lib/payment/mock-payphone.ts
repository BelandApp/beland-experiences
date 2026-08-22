// import type {
//   PaymentInitResult,
//   PaymentOrder,
//   PaymentProvider,
//   PaymentResult,
// } from "./types";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock Payphone provider used for development.
 *
 * Simulates the Payphone Brick flow: an initialization step followed by a
 * card-less processing step. It resolves with a success or a failed result
 * (about 1 in 5 attempts fail) so every checkout state can be exercised.
 *
 * Replacing this with the real Payphone Brick integration requires no UI
 * changes — see `lib/payment/provider.ts`.
 */

// TODO: delete when Payphone integration have done
// export class MockPayphoneProvider implements PaymentProvider {
//   readonly id = "payphone";
//   readonly displayName = "Payphone";

//   async initializePayment(order: PaymentOrder): Promise<PaymentInitResult> {
//     await delay(650);
//     return {
//       ok: true,
//       reference: order.reference,
//       checkoutUrl: `https://checkout.payphone.example/${order.reference}`,
//     };
//   }

//   async processPayment(order: PaymentOrder): Promise<PaymentResult> {
//     await delay(1900);
//     const declined = Math.random() < 0.2;
//     if (declined) {
//       return {
//         status: "failed",
//         reference: order.reference,
//         message: "El pago fue rechazado por el emisor. Verifica tus datos e inténtalo de nuevo.",
//       };
//     }
//     return {
//       status: "success",
//       reference: order.reference,
//       transactionId: `PYF-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
//     };
//   }
// }
