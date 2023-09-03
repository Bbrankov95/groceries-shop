import { memo } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { CartButton } from "components";
import { navRoutes } from "@constants";
import { useAppDispatch, useAppSelector } from "rtk/hooks";

import classes from "./Header.module.scss";
import { setisLogged } from "rtk/slices/authSlice";

type NavRoutes = typeof navRoutes;

const options: NavRoutes = navRoutes;

const Header = memo(() => {
  const { isLogged } = useAppSelector((state) => state.authData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <header className={classes.Header}>
      <label>Grocceries Store</label>
      <ul>
        {options.map(({ name, path }, i) => {
          if (!isLogged && path === "/groceries-management") return;
          return (
            <NavLink key={`${i}-${name}`} to={path}>
              {name}
            </NavLink>
          );
        })}
      </ul>
      <button
        onClick={() => {
          if (isLogged) {
            dispatch(setisLogged({ isLogged: false }));
            return;
          }
          navigate("?login=true");
        }}
      >
        {isLogged ? "Log Out" : "Log In"}
      </button>
      <CartButton />
    </header>
  );
});

export default Header;
