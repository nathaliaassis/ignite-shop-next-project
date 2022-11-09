import { stripe } from "lib/stripe";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { ImageContainer, SuccessContainer } from "styles/pages/success";

interface SuccessPageProps {
  customer: {
    name: string;
  };
  product: {
    name: string;
    imageUrl: string;
  };
}

export default function Success({ customer, product }: SuccessPageProps) {
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>
      <ImageContainer>
        <Image
          src={product.imageUrl}
          alt={`${product.name} photo`}
          width={150}
          height={150}
        />
      </ImageContainer>
      <p>
        Uhuul <strong>{customer.name}</strong>, sua{" "}
        <strong>{product.name}</strong> já está a caminho da sua casa.
      </p>

      <Link href="/">Voltar ao catálogo</Link>
    </SuccessContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { session_id } = query;

  if (!session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const product = session.line_items?.data[0].price?.product as Stripe.Product;

  return {
    props: {
      customer: {
        name: session.customer_details?.name,
      },
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};
