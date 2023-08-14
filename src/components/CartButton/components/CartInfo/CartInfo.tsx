import { memo, useContext, useMemo, type FC } from "react";

import { CartContext } from "contexts";

import classes from "./CartInfo.module.scss";
import CartInfoItem from "./components/CartInfoItem/CartInfoItem";

type CartInfoProps = {
  isOpen: boolean;
};

const CartInfo: FC<CartInfoProps> = memo(({ isOpen }) => {
  const { cart } = useContext(CartContext);
  const lastFiveAddedProducts = cart.slice(0, 3)?.reverse();
  const shouldShowEmptyCart = useMemo(() => cart.length === 0, [cart]);
  const shouldShowMore = useMemo(() => cart.length > 3, [cart]);
  const totalCheckoutPrice = useMemo(
    () =>
      cart.reduce((acc: number, next: (typeof cart)[0]) => {
        acc += next.price * next.quantity;
        return acc;
      }, 0),
    [cart]
  );

  return (
    <div className={[classes.Wrapper, isOpen && classes.Visible].join(" ")}>
      {shouldShowEmptyCart ? (
        <p>There's nothing in your cart yet...!</p>
      ) : (
        lastFiveAddedProducts.map(({ name, id, quantity, price }, i) => (
          <CartInfoItem
            key={`${id}-${i}`}
            name={name}
            id={id}
            price={price}
            quantity={quantity}
          />
        ))
      )}
      {shouldShowMore ? <p>See All</p> : null}
      <p>Total Checkout: {totalCheckoutPrice.toFixed(2) || "0.00"}$</p>
    </div>
  );
});

export default CartInfo;
