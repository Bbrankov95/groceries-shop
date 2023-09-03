import { memo, useState, useEffect, useMemo } from "react";

import { useAppSelector } from "rtk/hooks";
import { CartInfo } from "./components";

import classes from "./CartButton.module.scss";

const CartButton = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [blink, setBlink] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.allIds);

  const totalProducts = useMemo(() => cartItems.length ?? 0, [cartItems]);

  useEffect(() => {
    setBlink(true);
    setTimeout(() => {
      setBlink(false);
    }, 300);
  }, [cartItems]);

  return (
    <div className={classes.Wrapper}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-before-content={totalProducts}
        className={[classes.CartBtn, blink && classes.Blink].join(" ")}
      >
        Cart
      </button>
      <CartInfo isOpen={isOpen} />
    </div>
  );
});

export default CartButton;
