import {
  createContext,
  memo,
  useState,
  type ReactNode,
  type SetStateAction,
  type Dispatch,
} from "react";

import { Groceries } from "types";

type Cart = Groceries | [];

type CartContextProps = {
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart>>;
};

export const CartContext = createContext<CartContextProps>({
  cart: [],
  setCart: () => null,
});

const CartContextProvider = memo(({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>([]);

  const value = { cart, setCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
});

export default CartContextProvider;
