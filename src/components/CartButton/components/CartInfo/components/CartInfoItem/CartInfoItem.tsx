import { memo, useContext, type FC } from "react";

import { CartContext } from "contexts";
import { Grocerie } from "types";

type CartInfoItemProps = {
  name: Grocerie["name"];
  quantity: Grocerie["quantity"];
  id: Grocerie["id"];
  price: Grocerie["price"];
};

import classes from "./CartInfoItem.module.scss";

const CartInfoItem: FC<CartInfoItemProps> = memo(
  ({ name, quantity, id, price }) => {
    const { removeItem } = useContext(CartContext);

    return (
      <div className={classes.Wrapper}>
        <p>{name}</p>
        <div className={classes.Info}>
          <p>{quantity}</p>
          <p>{price}$</p>
          <button onClick={() => removeItem(id)}>&#10060;</button>
        </div>
      </div>
    );
  }
);

export default CartInfoItem;
