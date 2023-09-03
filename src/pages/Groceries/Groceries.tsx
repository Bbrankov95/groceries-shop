import { memo, useCallback, useEffect, useState } from "react";

import { Button, Catalog } from "components";
import { fetchGroceries } from "api";
import type { Groceries } from "types";
import { setisLogged } from "rtk/slices/authSlice";
import { useAppSelector, useAppDispatch } from "rtk/hooks";

import classes from "./Groceries.module.scss";

const Groceries = memo(() => {
  const [groceries, setGroceries] = useState<Groceries>([]);
  const dispatch = useAppDispatch();
  const { isLogged } = useAppSelector((state) => state.authData);

  const getGroceries = useCallback(async () => {
    try {
      const groceries = (await fetchGroceries())?.data;
      setGroceries(groceries);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getGroceries();
  }, [getGroceries]);

  useEffect(() => {
    console.log(isLogged);
  }, [isLogged]);

  return (
    <section className={classes.Wrapper}>
      <Button
        onClick={() =>
          dispatch(setisLogged({ isLogged: isLogged ? false : true }))
        }
      >
        {isLogged ? "Log out" : "Log in"}
      </Button>
      <Catalog groceries={groceries} />
    </section>
  );
});
export default Groceries;
