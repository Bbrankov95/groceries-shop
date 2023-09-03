import { memo } from "react";

import { SiderBar } from "./components";

import classes from "./AdminDashboard.module.scss";

const AdminDashboard = memo(() => {
  return (
    <div className={classes.Wrapper}>
      <SiderBar />
      <div className={classes.Content} />
    </div>
  );
});

export default AdminDashboard;
