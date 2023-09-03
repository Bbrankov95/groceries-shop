import { memo, useCallback, useEffect } from "react";

import { Button, Catalog } from "components";
import { fetchGroceries } from "api";
import type { Groceries } from "types";
import { setisLogged } from "rtk/slices/authSlice";
import { insertGroceries } from "rtk/slices/groceriesSlice";
import { useAppSelector, useAppDispatch } from "rtk/hooks";

import classes from "./Groceries.module.scss";

const Groceries = memo(() => {
  const { allIds: groceriesIds } = useAppSelector((state) => state.groceries);
  const { isLogged } = useAppSelector((state) => state.authData);
  const dispatch = useAppDispatch();

  const getGroceries = useCallback(async () => {
    try {
      const groceries = (await fetchGroceries())?.data;
      dispatch(insertGroceries(groceries));
      // setGroceries(groceries);
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getGroceries();
  }, [getGroceries]);

  return (
    <section className={classes.Wrapper}>
      <Button
        onClick={() =>
          dispatch(setisLogged({ isLogged: isLogged ? false : true }))
        }
      >
        {isLogged ? "Log out" : "Log in"}
      </Button>
      <Catalog groceries={groceriesIds} />
    </section>
  );
});
export default Groceries;
