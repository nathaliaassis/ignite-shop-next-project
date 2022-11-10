import React from "react";
import { BagProvider } from "./BagContext";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return <BagProvider>{children}</BagProvider>;
};

export default AppProvider;
