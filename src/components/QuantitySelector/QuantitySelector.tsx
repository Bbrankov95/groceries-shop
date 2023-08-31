import { memo, type FC, useMemo, ChangeEvent } from "react";

import classes from "./QuantitySelector.module.scss";
import { actions } from "@constants";
import { Button } from "components";

const { DECREMENT, INCREMENT } = actions;

type QuantitySelectorProps = {
  selectedQuantity: number;
  onQuantityChange: (action: keyof typeof actions) => void;
  maxCount: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const QuantitySelector: FC<QuantitySelectorProps> = memo(
  ({ selectedQuantity, onQuantityChange, maxCount, onChange }) => {
    const shouldDisableBtn = useMemo(
      () => selectedQuantity === 0,
      [selectedQuantity]
    );

    return (
      <div className={classes.Wrapper}>
        <Button
          disabled={shouldDisableBtn}
          onClick={() => onQuantityChange(DECREMENT)}
        >
          -
        </Button>
        <input type="text" onChange={onChange} value={selectedQuantity} />
        <Button
          disabled={selectedQuantity === maxCount}
          onClick={() => onQuantityChange(INCREMENT)}
        >
          +
        </Button>
      </div>
    );
  }
);

export default QuantitySelector;
