"use client";

import { ReactNode, createContext, useContext, useState } from "react";

interface CardContextType {
  reset: boolean;
  onReset: () => void;
}

export const CardContext = createContext<CardContextType | null>(null);

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [reset, setReset] = useState<boolean>(false);
  const onReset = () => {
    setReset((state) => !state);
  };

  return (
    <CardContext.Provider value={{ reset, onReset }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  const cardContext = useContext(CardContext);
  if (!cardContext) {
    throw new Error("useCardContext has to be used within CardProvider");
  }
  return cardContext;
};
