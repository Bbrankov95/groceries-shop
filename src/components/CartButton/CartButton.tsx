import { memo, useContext, useState, useEffect } from "react";

import { CartContext } from "contexts";
import { CartInfo } from "./components";

import classes from "./CartButton.module.scss";

const CartButton = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [test, setTest] = useState(false);
  const { cart } = useContext(CartContext);

  const totalProducts = cart?.length;

  useEffect(() => {
    setTest(true);
    setTimeout(() => {
      setTest(false);
    }, 300);
  }, [cart]);

  return (
    <div className={classes.Wrapper}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-before-content={totalProducts}
        className={[classes.CartBtn, test && classes.Blink].join(" ")}
      >
        Cart
      </button>
      <CartInfo isOpen={isOpen} />
    </div>
  );
});

export default CartButton;
