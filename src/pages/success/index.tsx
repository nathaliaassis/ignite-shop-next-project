import { stripe } from "lib/stripe";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import {
  ImageContainer,
  ImagesBox,
  SuccessContainer,
} from "styles/pages/success";

interface SuccessPageProps {
  customer: {
    name: string;
  };
  products: {
    name: string;
    imageUrl: string;
  }[];
}

export default function Success({ customer, products }: SuccessPageProps) {
  return (
    <>
      <Head>
        <title>Compra Efetuada | Ignite Shop</title>

        {/* fica fora da indexação do google  */}
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <ImagesBox>
          {products.map((product) => (
            <ImageContainer>
              <Image
                src={product.imageUrl}
                alt={`${product.name} photo`}
                width={140}
                height={140}
              />
            </ImageContainer>
          ))}
        </ImagesBox>
        <h2>Compra efetuada!</h2>
        <p>
          Uhuul <strong>{customer.name}</strong>, sua compra de{" "}
          {products.length} {products.length === 1 ? "camiseta" : "camisetas"}{" "}
          já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
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
  const productsList = session.line_items?.data.map((item) => {
    return item.price?.product as Stripe.Product;
  });

  const products = productsList?.map((product) => {
    return {
      name: product.name,
      imageUrl: product.images[0],
    };
  });

  return {
    props: {
      customer: {
        name: session.customer_details?.name,
      },
      products,
    },
  };
};
