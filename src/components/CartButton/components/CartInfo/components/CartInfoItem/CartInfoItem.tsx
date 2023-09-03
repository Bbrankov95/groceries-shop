import { memo, useCallback, type FC } from "react";

import { Button } from "components";
import { Grocerie } from "types";
import { useAppDispatch, useAppSelector } from "rtk/hooks";
import { removeFromCart } from "rtk/slices/cartSlice";

import classes from "./CartInfoItem.module.scss";

type CartInfoItemProps = {
  id: Grocerie["id"];
};

const CartInfoItem: FC<CartInfoItemProps> = memo(({ id }) => {
  const { name, price } = useAppSelector(
    useCallback((state) => state.groceries.byId?.[id], [id])
  );
  const quantity = useAppSelector(
    useCallback((state) => state.cart.itemsById?.[id].quantity, [id])
  );
  const dispatch = useAppDispatch();

  return (
    <div className={classes.Wrapper}>
      <p>{name}</p>
      <div className={classes.Info}>
        <p>{quantity}</p>
        <p>{price}$</p>
        <Button onClick={() => dispatch(removeFromCart(id))}>&#10060;</Button>
      </div>
    </div>
  );
});

export default CartInfoItem;
