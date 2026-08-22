import { PayphoneConfirmResponse } from "./types";

export async function confirmPayphoneTransaction(
  id: number,
  clientTxId: string,
  signal: AbortSignal,
): Promise<PayphoneConfirmResponse> {
  const payphoneToken = process.env.NEXT_PUBLIC_PAYPHONE_TOKEN;
  const payphoneConfirmEndpoint = process.env.NEXT_PUBLIC_PAYPHONE_CONFIRM;

  if (!payphoneToken) {
    throw new Error("No se encontró el token de Payphone");
  }
  if (!payphoneConfirmEndpoint) {
    throw new Error("No se encontró el endpoint de Payphone Confirm");
  }

  const response = await fetch(payphoneConfirmEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${payphoneToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      clientTxId,
    }),
    signal,
  });

  const data = await response.json();
  return data;
}
