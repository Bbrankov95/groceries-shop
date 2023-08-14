import { memo, type FC } from "react";

import { Groceries } from "types";
import { CatalogItem } from "./components";

import classes from "./Catalog.module.scss";

type CatalogProps = {
  groceries: Groceries;
};

const Catalog: FC<CatalogProps> = memo(({ groceries }) => {
  return (
    <div className={classes.Wrapper}>
      {groceries?.map?.((grocerie, i) => (
        <CatalogItem key={`${grocerie.id}-${i}`} grocerie={grocerie} />
      ))}
    </div>
  );
});

export default Catalog;
