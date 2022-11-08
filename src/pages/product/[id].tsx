import { stripe } from "lib/stripe";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Stripe from "stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "styles/pages/Product";

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <span>Loading...</span>;
  }
  return (
    <ProductContainer>
      <ImageContainer>
        <Image
          src={product.imageUrl}
          width={520}
          height={480}
          alt={`${product.name}-photo`}
        />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_Ml68wXTxp2orJJ" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = String(params?.id);

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;
  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
        description: product.description,
      },
    },
  };
};
