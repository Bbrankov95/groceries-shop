import { memo, type FC, useMemo } from "react";

import { Groceries } from "types";
import { CatalogItem } from "./components";

import classes from "./Catalog.module.scss";

type CatalogProps = {
  groceries: Groceries;
};

const Catalog: FC<CatalogProps> = memo(({ groceries = [] }) => {
  const isEmpty = useMemo(() => groceries.length === 0, [groceries.length]);

  return (
    <div className={classes.Wrapper}>
      {isEmpty ? (
        <p className={classes.CatalogEmpty}>No Items Found.</p>
      ) : (
        groceries?.map?.((grocerie, i) => (
          <CatalogItem key={`${grocerie.id}-${i}`} grocerie={grocerie} />
        ))
      )}
    </div>
  );
});

export default Catalog;
