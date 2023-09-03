import {
  memo,
  useState,
  useCallback,
  useMemo,
  type FC,
  type ChangeEvent,
} from "react";

import { type Grocerie } from "types";

import { Button, QuantitySelector } from "components";
import { actions } from "@constants";
import { useAppDispatch, useAppSelector } from "rtk/hooks";
import { addToCart } from "rtk/slices/cartSlice";

const { DECREMENT, INCREMENT } = actions;

import classes from "./CatalogItem.module.scss";

type CatalogItemProps = {
  grocerieId: Grocerie["id"];
};

const CatalogItem: FC<CatalogItemProps> = memo(({ grocerieId }) => {
  const grocerie =
    useAppSelector(
      useCallback((state) => state.groceries.byId?.[grocerieId], [grocerieId])
    ) ?? {};
  const { name, quantity, price, img } = grocerie ?? {};
  const imageFromBase64Encoding = `data:image/png;base64,${img}`;
  const [selectedQuantity, setSelectedQuantity] =
    useState<Grocerie["quantity"]>(0);
  const dispatch = useAppDispatch();

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

  const onAddToCart = useCallback(() => {
    dispatch(addToCart({ id: grocerieId, quantity: selectedQuantity }));
    setSelectedQuantity(0);
  }, [dispatch, grocerieId, selectedQuantity]);

  const onQuantityChange = useCallback((action: keyof typeof actions) => {
    if (action === DECREMENT) {
      return setSelectedQuantity((prevState) => prevState - 1);
    } else if (action === INCREMENT) {
      return setSelectedQuantity((prevState) => prevState + 1);
    }
  }, []);

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
