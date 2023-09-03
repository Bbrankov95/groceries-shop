import { memo } from "react";

import classes from "./AdminDashboard.module.scss";

const AdminDashboard = memo(() => {
  return (
    <div className={classes.Wrapper}>
      <div className={classes.Sidebar} />
      <div className={classes.Content} />
    </div>
  );
});

export default AdminDashboard;
