import { memo, type FC, useMemo } from "react";

import { Grocerie } from "types";
import { CatalogItem } from "./components";

import classes from "./Catalog.module.scss";

type CatalogProps = {
  groceries: Grocerie["id"][];
};

const Catalog: FC<CatalogProps> = memo(({ groceries = [] }) => {
  const isEmpty = useMemo(() => groceries.length === 0, [groceries.length]);

  return (
    <div className={classes.Wrapper}>
      {isEmpty ? (
        <p className={classes.CatalogEmpty}>No Items Found.</p>
      ) : (
        groceries?.map?.((grocerieId, i) => (
          <CatalogItem key={`${grocerieId}-${i}`} grocerieId={grocerieId} />
        ))
      )}
    </div>
  );
});

export default Catalog;
