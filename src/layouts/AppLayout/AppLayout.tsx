import { memo, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "components";
import { Homepage, Groceries } from "pages";

import classes from "./AppLayout.module.scss";
import { CartContext } from "contexts";

const AppLayout = memo(() => {
  const { cart } = useContext(CartContext);
  console.log(cart);
  return (
    <main className={classes.AppLayout}>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/groceries" element={<Groceries />} />
      </Routes>
    </main>
  );
});

export default AppLayout;
