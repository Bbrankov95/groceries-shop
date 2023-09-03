import { memo, useMemo, type FC } from "react";

import { useAppSelector } from "rtk/hooks";
import { CartInfoItem } from "./components";

import classes from "./CartInfo.module.scss";

type CartInfoProps = {
  isOpen: boolean;
};

const CartInfo: FC<CartInfoProps> = memo(({ isOpen }) => {
  const { allIds: cartItemsIds, itemsById: cartItemsById } = useAppSelector(
    (state) => state.cart
  );
  const { byId: groceriesById } = useAppSelector((state) => state.groceries);

  const shouldShowEmptyCart = useMemo(
    () => cartItemsIds.length === 0,
    [cartItemsIds]
  );
  const shouldShowMore = useMemo(
    () => cartItemsIds.length > 3,
    [cartItemsIds.length]
  );
  const totalCheckoutPrice = useMemo(
    () =>
      cartItemsIds.reduce((acc, next) => {
        acc += groceriesById[next].price * cartItemsById[next].quantity;
        return acc;
      }, 0),
    [cartItemsById, cartItemsIds, groceriesById]
  );

  return (
    <div className={[classes.Wrapper, isOpen && classes.Visible].join(" ")}>
      {shouldShowEmptyCart ? (
        <p>Your Cart is Empty!</p>
      ) : (
        <>
          <div className={classes.Labels}>
            <p>Name</p>
            <div>
              <p>Qty.</p>
              <p>Price</p>
            </div>
          </div>
          {cartItemsIds.map((cartItemId, i) => (
            <CartInfoItem key={`${cartItemId}-${i}`} id={cartItemId} />
          ))}
        </>
      )}
      {shouldShowMore ? <p>See All</p> : null}
      {!shouldShowEmptyCart ? (
        <p>
          Total Checkout:{" "}
          <span>{totalCheckoutPrice.toFixed(2) || "0.00"}$</span>
        </p>
      ) : null}
    </div>
  );
});

export default CartInfo;
