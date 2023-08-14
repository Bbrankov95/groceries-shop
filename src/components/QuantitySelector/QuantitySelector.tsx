import { memo, type FC, useMemo } from "react";

import classes from "./QuantitySelector.module.scss";
import { actions } from "@constants";

const { DECREMENT, INCREMENT } = actions;

type QuantitySelectorProps = {
  selectedQuantity: number;
  onQuantityChange: (action: keyof typeof actions) => void;
  maxCount: number;
};

const QuantitySelector: FC<QuantitySelectorProps> = memo(
  ({ selectedQuantity, onQuantityChange, maxCount }) => {
    const shouldDisableBtn = useMemo(
      () => selectedQuantity === 0,
      [selectedQuantity]
    );

    return (
      <div className={classes.Wrapper}>
        <button
          disabled={shouldDisableBtn}
          onClick={() => onQuantityChange(DECREMENT)}
        >
          -
        </button>
        <p>{selectedQuantity}</p>
        <button
          disabled={selectedQuantity === maxCount}
          onClick={() => onQuantityChange(INCREMENT)}
        >
          +
        </button>
      </div>
    );
  }
);

export default QuantitySelector;
