import { memo } from "react";
import { NavLink } from "react-router-dom";

import { CartButton } from "components";
import { navRoutes } from "@constants";

import classes from "./Header.module.scss";

type NavRoutes = typeof navRoutes;

const options: NavRoutes = navRoutes;

const Header = memo(() => {
  return (
    <header className={classes.Header}>
      <label>Grocceries Store</label>
      <ul>
        {options.map(({ name, path }, i) => (
          <NavLink key={`${i}-${name}`} to={path}>
            {name}
          </NavLink>
        ))}
      </ul>
      <CartButton />
    </header>
  );
});

export default Header;
