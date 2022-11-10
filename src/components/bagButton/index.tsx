import Image from "next/image";
import { useBag } from "hooks/BagContext";
import { Container } from "./styles";

import BagIcon from "assets/bag.svg";

interface BagButtonProps {
  showQuantity?: boolean;
  color?: "green" | "gray";
}

export default function BagButton({
  showQuantity,
  color = "green",
}: BagButtonProps) {
  const { items, openBag } = useBag();

  return (
    <Container onClick={openBag} color={color}>
      <Image src={BagIcon} width={32} height={32} alt="Bag icon" />
      {showQuantity && items?.length ? <div>{items.length}</div> : null}
    </Container>
  );
}
