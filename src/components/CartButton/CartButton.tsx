import { memo, useState, useEffect, useMemo } from "react";

import { Button } from "components";
import { useAppSelector } from "rtk/hooks";
import { CartInfo } from "./components";

import classes from "./CartButton.module.scss";

const CartButton = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [test, setTest] = useState(false);
  const cart = useAppSelector((state) => state.cart.allIds);

  const totalProducts = useMemo(() => cart.length, [cart]);

  useEffect(() => {
    setTest(true);
    setTimeout(() => {
      setTest(false);
    }, 300);
  }, [cart]);

  return (
    <div className={classes.Wrapper}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        data-before-content={totalProducts}
        className={[classes.CartBtn, test && classes.Blink].join(" ")}
      >
        Cart
      </Button>
      <CartInfo isOpen={isOpen} />
    </div>
  );
});

export default CartButton;
