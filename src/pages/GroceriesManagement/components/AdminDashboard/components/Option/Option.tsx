import { type FC, memo, type MouseEventHandler } from "react";

import { SidebarOption } from "../SiderBar/SiderBar";

import classes from "./Option.module.scss";

type OptionProps = {
  option: SidebarOption;
  isActive?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Option: FC<OptionProps> = memo(({ option, isActive, onClick }) => {
  const { name } = option;
  return (
    <button
      className={[classes.Option, isActive ? classes.Active : undefined].join(
        " "
      )}
      onClick={onClick}
    >
      {name}
    </button>
  );
});

export default Option;
