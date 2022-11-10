import type { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
import AppProvider from "hooks";
import Bag from "components/bag";
import BagButton from "components/bagButton";
import { globalStyles } from "styles/global";
import { Container, Header } from "styles/pages/app";

import logoImg from "assets/logo.svg";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Container>
        <Bag />
        <Header>
          <Link href="/">
            <Image src={logoImg} alt="shop logo" />
          </Link>

          <BagButton color="gray" showQuantity />
        </Header>
        <Component {...pageProps} />
      </Container>
    </AppProvider>
  );
}
