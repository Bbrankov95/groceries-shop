import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "components";
import { Homepage, Groceries } from "pages";

import classes from "./AppLayout.module.scss";

const AppLayout = memo(() => {
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
