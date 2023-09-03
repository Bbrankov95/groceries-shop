import { memo, useState } from "react";

import { Option } from "../";

import classes from "./SideBar.module.scss";

export type SidebarOption = {
  id: string;
  name: string;
};

const options: SidebarOption[] = [
  { id: "ADD_GROCERIE", name: "Add Grocerie" },
  { id: "EDIT_GROCERIE", name: "Edit Grocerie" },
];

const SiderBar = memo(() => {
  const [selectedOption, setSelectedOption] = useState<SidebarOption>(
    options[0]
  );
  return (
    <aside className={classes.Wrapper}>
      {options?.map((option, i) => (
        <Option
          key={`${option.id}=${i}`}
          option={option}
          onClick={() => setSelectedOption(option)}
          isActive={selectedOption?.id === option.id}
        />
      ))}
    </aside>
  );
});

export default SiderBar;
