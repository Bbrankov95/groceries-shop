import { memo } from "react";
import { Navigate } from "react-router";

import { useAppSelector } from "rtk/hooks";
import { AdminDashboard } from "./components";

import classes from "./GroceriesManagement.module.scss";

const GroceriesManagement = memo(() => {
  const { isLogged } = useAppSelector((state) => state.authData);

  return isLogged ? (
    <section className={classes.Wrapper}>
      <AdminDashboard />
    </section>
  ) : (
    <Navigate to={`?login=true`} />
  );
});

export default GroceriesManagement;
