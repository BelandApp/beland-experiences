import type { Metadata } from "next";
import { ErrorState } from "@/components/feedback/ErrorState";
import { experiencesApi } from "@/lib/data/publications";

export const metadata: Metadata = {
  title: "Pago no completado — Beland",
};

export default async function CheckoutErrorPage(
  props: PageProps<"/checkout/error">,
) {
  const searchParams = await props.searchParams;
  const productId = Array.isArray(searchParams.product)
    ? searchParams.product[0]
    : searchParams.product;
  const reference = Array.isArray(searchParams.ref)
    ? searchParams.ref[0]
    : searchParams.ref;

  const publication = experiencesApi.getById(productId!);

  return <ErrorState publication={publication} reference={reference} />;
}
