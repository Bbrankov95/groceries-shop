import {
  memo,
  useContext,
  useState,
  useCallback,
  useMemo,
  type FC,
} from "react";

import { type Grocerie } from "types";

import { QuantitySelector } from "components";
import { CartContext } from "contexts";
import { actions } from "@constants";

const { DECREMENT, INCREMENT } = actions;

import classes from "./CatalogItem.module.scss";

type CatalogItemProps = {
  grocerie: Grocerie;
};

const CatalogItem: FC<CatalogItemProps> = memo(({ grocerie }) => {
  const { name, quantity, price, id } = grocerie ?? {};
  const [selectedQuantity, setSelectedQuantity] =
    useState<CatalogItemProps["grocerie"]["quantity"]>(0);
  const { setCart, cart } = useContext(CartContext);

  const onQuantityChange = useCallback((action: keyof typeof actions) => {
    if (action === DECREMENT) {
      return setSelectedQuantity((prevState) => prevState - 1);
    } else if (action === INCREMENT) {
      return setSelectedQuantity((prevState) => prevState + 1);
    }
  }, []);

  const onAddToCart = useCallback(() => {
    const doesItemExist = cart.find((item) => item.id === id);
    if (typeof doesItemExist === "undefined") {
      setCart((prevCart) => [
        ...prevCart,
        { ...grocerie, quantity: selectedQuantity },
      ]);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + selectedQuantity }
            : item
        )
      );
    }

    setSelectedQuantity(0);
  }, [cart, grocerie, id, selectedQuantity, setCart]);

  const shouldDisableBtn = useMemo(
    () => selectedQuantity === 0,
    [selectedQuantity]
  );

  return (
    <div className={classes.Wrapper}>
      <h2>{name}</h2>
      <div className={classes.Image} />
      <p>Quantity: {`${quantity - selectedQuantity}`}</p>
      <p>Price: {price}$</p>
      <QuantitySelector
        selectedQuantity={selectedQuantity}
        onQuantityChange={onQuantityChange}
        maxCount={quantity}
      />
      <button disabled={shouldDisableBtn} onClick={onAddToCart}>
        Add to Cart
      </button>
    </div>
  );
});

export default CatalogItem;
