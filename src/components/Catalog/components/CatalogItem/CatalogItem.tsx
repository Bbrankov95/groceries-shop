import { memo, type FC, useContext, useState, useCallback } from "react";

import { type Grocerie } from "types";

import { QuantitySelector } from "components";
import { CartContext } from "contexts";
import { actions } from "@constants";

const { DECREMENT, INCREMENT } = actions;

import classes from "./CatalogItem.module.scss";

type CatalogItemProps = {
  name: Grocerie["name"];
  quantity: Grocerie["quantity"];
  id: Grocerie["id"];
};

const CatalogItem: FC<CatalogItemProps> = memo(({ name, quantity, id }) => {
  const [selectedQuantity, setSelectedQuantity] =
    useState<CatalogItemProps["quantity"]>(0);
  const { setCart } = useContext(CartContext);

  const onQuantityChange = useCallback(
    (action: keyof typeof actions) => {
      if (action === DECREMENT) {
        if (selectedQuantity === 0) return;
        return setSelectedQuantity((prevState) => prevState - 1);
      } else if (action === INCREMENT) {
        if (selectedQuantity === quantity) return;
        return setSelectedQuantity((prevState) => prevState + 1);
      }
    },
    [quantity, selectedQuantity]
  );

  const onAddToCart = useCallback(() => {
    setCart((prevCart) => [
      ...prevCart,
      { name, id, quantity: selectedQuantity },
    ]);
    setSelectedQuantity(0);
  }, [id, name, selectedQuantity, setCart]);

  return (
    <div className={classes.Wrapper}>
      <h2>{name}</h2>
      <div
        style={{
          width: "100%",
          backgroundColor: "transparent",
        }}
      />
      <p>Quantity: {`${quantity}`}</p>
      <QuantitySelector
        selectedQuantity={selectedQuantity}
        onQuantityChange={onQuantityChange}
      />
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  );
});

export default CatalogItem;
