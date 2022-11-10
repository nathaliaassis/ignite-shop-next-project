import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {
  BagButton,
  HomeContainer,
  Product,
  ProductDescription,
} from "styles/pages/home";

import { stripe } from "lib/stripe";
import Stripe from "stripe";
import Head from "next/head";

import BagIcon from "assets/bag.svg";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}
export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image
                  src={product.imageUrl}
                  width={520}
                  height={480}
                  alt={`shirt-1`}
                />
                <footer>
                  <ProductDescription>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </ProductDescription>
                  <BagButton>
                    <Image
                      src={BagIcon}
                      width={32}
                      height={32}
                      alt="Bag icon"
                    />
                  </BagButton>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  //getStaticProps não tenho acesso a informação do user ou cookies (contexto da aplicação)
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
