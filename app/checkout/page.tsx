import type { Metadata } from "next";
import { Checkout } from "@/components/checkout/Checkout";
import { CheckoutEmpty } from "@/components/checkout/CheckoutEmpty";
import { experiencesApi } from "@/lib/data/publications";

export const metadata: Metadata = {
  title: "Finalizar compra — Beland",
};

export default async function CheckoutPage(props: PageProps<"/checkout">) {
  const searchParams = await props.searchParams;
  const productId = Array.isArray(searchParams.product)
    ? searchParams.product[0]
    : searchParams.product;

  const rawPublication = await experiencesApi.getById(productId!);
  const publication = {
    ...rawPublication,
    images_url: [
      "/gafa-redonda-1.jpeg",
      "/gafa-redonda-2.jpeg",
      "/gafa-redonda-3.jpeg",
    ],
  };
  if (!publication) {
    return <CheckoutEmpty />;
  }

  return <Checkout publication={publication} />;
}
