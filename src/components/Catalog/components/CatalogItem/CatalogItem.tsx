import {
  memo,
  useContext,
  useState,
  useCallback,
  useMemo,
  type FC,
  type ChangeEvent,
} from "react";

import { type Grocerie } from "types";

import { Button, QuantitySelector } from "components";
import { CartContext } from "contexts";
import { actions } from "@constants";

const { DECREMENT, INCREMENT } = actions;

import classes from "./CatalogItem.module.scss";

type CatalogItemProps = {
  grocerie: Grocerie;
};

const CatalogItem: FC<CatalogItemProps> = memo(({ grocerie }) => {
  const { name, quantity, price, id, img } = grocerie ?? {};
  const imageFromBase64Encoding = `data:image/png;base64,${img}`;
  const [selectedQuantity, setSelectedQuantity] =
    useState<CatalogItemProps["grocerie"]["quantity"]>(0);
  const { setCart, cart } = useContext(CartContext);

  const shouldDisableBtn = useMemo(
    () => selectedQuantity === 0,
    [selectedQuantity]
  );
  const remainingQuantity = useMemo(
    () => quantity - selectedQuantity,
    [quantity, selectedQuantity]
  );
  const outOfStock = useMemo(
    () => remainingQuantity === 0,
    [remainingQuantity]
  );

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

  const onQuantityInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!isNaN(Number(e.target.value)) || e.target.value === "") {
        setSelectedQuantity(
          Number(e.target.value) > quantity ? quantity : Number(e.target.value)
        );
      }
    },
    [quantity]
  );

  return (
    <div className={classes.Wrapper}>
      <h2>{name}</h2>
      <img
        src={imageFromBase64Encoding}
        className={[
          classes.Image,
          !remainingQuantity && classes.OutOfStock,
        ].join(" ")}
      />
      <p className={outOfStock ? classes.OutOfStock : undefined}>
        {!outOfStock ? `Quantity: ${remainingQuantity} ` : "Out Of Stock!"}
      </p>
      <p>Price: {price}$</p>
      <QuantitySelector
        selectedQuantity={selectedQuantity}
        onQuantityChange={onQuantityChange}
        maxCount={quantity}
        onChange={onQuantityInputChange}
      />
      <Button disabled={shouldDisableBtn} onClick={onAddToCart}>
        Add to Cart
      </Button>
    </div>
  );
});

export default CatalogItem;
