import { memo, useCallback, useEffect } from "react";

import { Catalog } from "components";
import { fetchGroceries } from "api";
import type { Groceries } from "types";
import { insertGroceries } from "rtk/slices/groceriesSlice";
import { useAppSelector, useAppDispatch } from "rtk/hooks";

import classes from "./Groceries.module.scss";

const Groceries = memo(() => {
  const { allIds: groceriesIds } = useAppSelector((state) => state.groceries);
  const dispatch = useAppDispatch();

  const getGroceries = useCallback(async () => {
    try {
      const groceries = (await fetchGroceries())?.data;
      dispatch(insertGroceries(groceries));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getGroceries();
  }, [getGroceries]);

  return (
    <section className={classes.Wrapper}>
      <Catalog groceries={groceriesIds} />
    </section>
  );
});
export default Groceries;
