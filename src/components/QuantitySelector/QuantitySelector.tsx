import { memo, type FC } from "react";

import classes from "./QuantitySelector.module.scss";
import { actions } from "@constants";

const { DECREMENT, INCREMENT } = actions;

type QuantitySelectorProps = {
  selectedQuantity: number;
  onQuantityChange: (action: keyof typeof actions) => void;
};

const QuantitySelector: FC<QuantitySelectorProps> = memo(
  ({ selectedQuantity, onQuantityChange }) => {
    return (
      <div className={classes.Wrapper}>
        s<button onClick={() => onQuantityChange(DECREMENT)}>-</button>
        <p>{selectedQuantity}</p>
        <button onClick={() => onQuantityChange(INCREMENT)}>+</button>
      </div>
    );
  }
);

export default QuantitySelector;
