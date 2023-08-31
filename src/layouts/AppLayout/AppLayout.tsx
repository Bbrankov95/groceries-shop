import { memo, useMemo } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";

import { Header, LoginModal } from "components";
import { Homepage, Groceries } from "pages";

import classes from "./AppLayout.module.scss";

const AppLayout = memo(() => {
  const [searchParams] = useSearchParams();
  const isLoginModalOpen = useMemo(
    () => searchParams.get("login") === "true",
    [searchParams]
  );

  return (
    <main className={classes.AppLayout}>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/groceries" element={<Groceries />} />
      </Routes>
      <LoginModal isOpen={isLoginModalOpen} />
    </main>
  );
});

export default AppLayout;
