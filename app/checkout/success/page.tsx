import type { Metadata } from "next";
import { getPublicationById } from "@/lib/data/publications";
import { SuccessState } from "@/components/feedback/SuccessState";

export const metadata: Metadata = {
  title: "Compra realizada — Beland",
};

export default async function CheckoutSuccessPage(
  props: PageProps<"/checkout/success">,
) {
  const searchParams = await props.searchParams;
  const productId = Array.isArray(searchParams.product)
    ? searchParams.product[0]
    : searchParams.product;
  const reference = Array.isArray(searchParams.ref)
    ? searchParams.ref[0]
    : searchParams.ref;
  const transactionId = Array.isArray(searchParams.tx)
    ? searchParams.tx[0]
    : searchParams.tx;

  const publication = getPublicationById(productId);

  return (
    <SuccessState
      publication={publication}
      reference={reference}
      transactionId={transactionId}
    />
  );
}
