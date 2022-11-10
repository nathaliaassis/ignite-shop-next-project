import Image from "next/image";
import { useBag } from "hooks/BagContext";
import { Container } from "./styles";

import BagIcon from "assets/bag.svg";

interface BagButtonProps {
  showQuantity?: boolean;
  color?: "green" | "gray";
  openBagFunction?: boolean;
}

export default function BagButton({
  showQuantity,
  color = "green",
  openBagFunction,
}: BagButtonProps) {
  const { items, openBag } = useBag();

  return (
    <Container
      onClick={() => {
        if (openBagFunction) {
          openBag();
        }
      }}
      color={color}
    >
      <Image src={BagIcon} width={32} height={32} alt="Bag icon" />
      {showQuantity && items?.length ? <div>{items.length}</div> : null}
    </Container>
  );
}
