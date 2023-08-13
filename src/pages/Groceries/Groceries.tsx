import { memo, useEffect, useState } from "react";

import { Catalog } from "components";
import { fetchGroceries } from "api";
import { type Groceries } from "types";

import classes from "./Groceries.module.scss";

const Groceries = memo(() => {
  const [groceries, setGroceries] = useState<Groceries>([]);

  const getGroceries = async () => {
    try {
      const groceries = (await fetchGroceries())?.data;
      setGroceries(groceries);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroceries();
  }, []);

  return (
    <section className={classes.Wrapper}>
      <Catalog groceries={groceries} />
    </section>
  );
});
export default Groceries;
