import { memo } from "react";
import { NavLink } from "react-router-dom";

import { navRoutes } from "@constants";

import classes from "./Header.module.scss";

type NavRoutes = typeof navRoutes;

const options: NavRoutes = navRoutes;

const Header = memo(() => {
  return (
    <header className={classes.Header}>
      <label>Groccerie Store</label>
      <ul>
        {options.map(({ name, path }) => (
          <NavLink to={path}>{name}</NavLink>
        ))}
      </ul>
    </header>
  );
});

export default Header;
