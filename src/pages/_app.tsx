import type { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import AppProvider from "hooks";
import Bag from "components/bag";
import BagButton from "components/bagButton";
import { globalStyles } from "styles/global";
import { Container, Header } from "styles/pages/app";

import logoImg from "assets/logo.svg";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showBagButton = router.pathname !== "/success";

  return (
    <AppProvider>
      <Container>
        <Bag />
        <Header showBagButton={showBagButton}>
          <Link href="/">
            <Image src={logoImg} alt="shop logo" />
          </Link>
          {showBagButton && (
            <BagButton color="gray" showQuantity openBagFunction />
          )}
        </Header>
        <Component {...pageProps} />
      </Container>
    </AppProvider>
  );
}
