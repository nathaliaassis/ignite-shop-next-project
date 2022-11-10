import Image from "next/image";

import {
  CloseButton,
  Container,
  Products,
  ProductItem,
  ProductImage,
  ProductDetails,
  Quantity,
  Total,
  BuyButton,
} from "./styles";

import closeIcon from "assets/close.svg";
import { useBag } from "hooks/BagContext";
import { useState } from "react";
import axios from "axios";

export default function Bag() {
  const { isOpened, closeBag, items, removeItemFromBag, total } = useBag();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleFinishButton() {
    try {
      setIsCreatingCheckoutSession(true);

      const products = items.map((item) => {
        return {
          price: item.defaultPriceId,
          quantity: 1,
        };
      });

      const response = await axios.post("/api/checkout", {
        products,
      });

      const { checkoutUrl } = response.data;

      items.map((item) => removeItemFromBag(item.id));
      window.location.href = checkoutUrl; // rota externa
    } catch (error) {
      setIsCreatingCheckoutSession(false);
      // Conectar com uma ferramenta de observabilidade (DataDog, Sentry)
      alert("Falha ao redirecionar ao checkout.");
    }
  }

  return (
    <Container isOpened={isOpened}>
      <CloseButton onClick={closeBag}>
        <Image src={closeIcon} height={24} width={24} alt="close icon" />
      </CloseButton>
      <h3>Sacola de compras</h3>
      <Products>
        {items?.length ? (
          items.map((item) => (
            <ProductItem key={item.id}>
              <ProductImage>
                <Image
                  src={item.imageUrl}
                  height={80}
                  width={80}
                  alt={`${item.name} photo`}
                />
              </ProductImage>
              <ProductDetails>
                <span>{item.name}</span>
                <strong>{item.price}</strong>
                <button onClick={() => removeItemFromBag(item.id)}>
                  Remover
                </button>
              </ProductDetails>
            </ProductItem>
          ))
        ) : (
          <span>A sacola está vazia. </span>
        )}
      </Products>
      <div>
        <Quantity>
          <span>Quantidade</span>

          {items?.length ? (
            <span>
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          ) : (
            <span>-</span>
          )}
        </Quantity>

        <Total>
          <strong>Valor total</strong>
          <strong>{total}</strong>
        </Total>
        <BuyButton
          disabled={!items?.length || isCreatingCheckoutSession}
          onClick={handleFinishButton}
        >
          Finalizar Compra
        </BuyButton>
      </div>
    </Container>
  );
}
