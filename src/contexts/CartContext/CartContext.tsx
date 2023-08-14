import {
  createContext,
  memo,
  useState,
  type ReactNode,
  type SetStateAction,
  type Dispatch,
} from "react";

import { Grocerie, Groceries } from "types";

type Cart = Groceries;

type CartContextProps = {
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart>>;
  removeItem: (id: Grocerie["id"]) => void;
};

export const CartContext = createContext<CartContextProps>({
  cart: [],
  setCart: () => null,
  removeItem: () => null,
});

const CartContextProvider = memo(({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>([]);

  const removeItem = (id: Grocerie["id"]) => {
    setCart((prevState) => prevState.filter(({ id: itemId }) => itemId !== id));
  };

  const value = { cart, setCart, removeItem };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
});

export default CartContextProvider;
