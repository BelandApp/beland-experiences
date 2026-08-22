import { CheckState } from "@/components/feedback/CheckState";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chequeando Compra — Beland",
};

export default async function CheckoutCheckPage(
  props: PageProps<"/checkout/check">,
) {
  const searchParams = await props.searchParams;

  const id = Array.isArray(searchParams.id)
    ? searchParams.id[0]
    : searchParams.id;
  const clientTransactionId = Array.isArray(searchParams.clientTransactionId)
    ? searchParams.clientTransactionId[0]
    : searchParams.clientTransactionId;

  return <CheckState id={id} clientTransactionId={clientTransactionId} />;
}
