import type { AppProps } from "next/app";
import Image from "next/image";
import { globalStyles } from "styles/global";
import { Container, Header } from "styles/pages/app";

import logoImg from "assets/logo.svg";
import Bag from "components/bag";
import AppProvider from "hooks";
import Link from "next/link";

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
        </Header>
        <Component {...pageProps} />
      </Container>
    </AppProvider>
  );
}
