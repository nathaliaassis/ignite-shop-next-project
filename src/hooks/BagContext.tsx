import React, { createContext, useContext, useEffect, useState } from "react";

interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  defaultPriceId: string;
  quantity?: number;
}

interface BagContextProps {
  isOpened: boolean;
  openBag: () => void;
  closeBag: () => void;
  addNewItemToBag: (product: ProductProps) => void;
  removeItemFromBag: (productId: string) => void;
  items: ProductProps[];
  total: string;
}

interface BagProviderProps {
  children: React.ReactNode;
}

const BagContext = createContext<BagContextProps>({} as BagContextProps);

export const BagProvider: React.FC<BagProviderProps> = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [items, setItems] = useState<ProductProps[]>([]);
  const [total, setTotal] = useState<string>("");

  const openBag = () => setIsOpened(true);
  const closeBag = () => setIsOpened(false);

  useEffect(() => {
    let storageItems;
    storageItems = localStorage.getItem("@IgniteShop") as string;

    if (storageItems) {
      setItems(JSON.parse(storageItems).items);
    }
  }, []);

  useEffect(() => {
    const itemsPrice = items.map((item) => {
      const price = item.price.replace(/\D/g, "");

      return Number(price) / 100;
    });

    const totalValue = itemsPrice.reduce((acc, currentValue) => {
      return acc + currentValue;
    }, 0);

    setTotal(
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(totalValue)
    );
  }, [items]);

  const addNewItemToBag = (product: ProductProps) => {
    try {
      openBag();
      const productAlreadyExists = items.find((item) => item.id === product.id);

      if (productAlreadyExists) {
        alert("Este produto já está na sacola");
        return;
      }

      setItems((existentItems) => [...existentItems, product]);

      localStorage.setItem(
        "@IgniteShop",
        JSON.stringify({
          items: [...items, product],
        })
      );
    } catch (error) {
      alert("Ocorreu um erro ao tentar adicionar o produto a sacola.");
    }
  };

  const removeItemFromBag = (productsIds: Array<string>) => {
    console.log("item to be removed ", productsIds);
    const newListWithoutItem = items.filter(
      (item) => !productsIds.includes(item.id)
    );

    setItems(newListWithoutItem);

    localStorage.setItem(
      "@IgniteShop",
      JSON.stringify({
        items: [...newListWithoutItem],
      })
    );
  };

  return (
    <BagContext.Provider
      value={{
        isOpened,
        openBag,
        closeBag,
        addNewItemToBag,
        removeItemFromBag,
        items,
        total,
      }}
    >
      {children}
    </BagContext.Provider>
  );
};

export function useBag(): BagContextProps {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error("useBag must be use within a ptovider");
  }

  return context;
}
