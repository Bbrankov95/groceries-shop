import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "components";
import { Homepage } from "pages";

import classes from "./AppLayout.module.scss";

const AppLayout = memo(() => {
  return (
    <main className={classes.AppLayout}>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </main>
  );
});

export default AppLayout;
