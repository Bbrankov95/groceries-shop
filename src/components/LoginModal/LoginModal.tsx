import {
  ChangeEvent,
  memo,
  useState,
  type FC,
  type FormEvent,
  useCallback,
} from "react";

import { Button } from "components";
import { User } from "types";
import { useAppDispatch } from "rtk/hooks";

import classes from "./LoginModal.module.scss";
import { setisLogged } from "rtk/slices/authSlice";
import { useLocation, useNavigate } from "react-router";

type LoginModalProps = {
  isOpen: boolean;
};

const LoginModal: FC<LoginModalProps> = memo(({ isOpen }) => {
  const [formData, setFormData] = useState<User>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const { password, username } = formData;

  const onSubmitHandler = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(setisLogged({ isLogged: true }));
      navigate(`../${pathname}`, { replace: true });
    },
    [dispatch, navigate, pathname]
  );

  const onCancel = useCallback(() => {
    navigate(`../${pathname}`, { replace: true });
  }, [navigate, pathname]);

  const onInputChange = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return isOpen ? (
    <div className={classes.Wrapper}>
      <form onSubmit={onSubmitHandler} className={classes.Form}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            onChange={onInputChange}
            name="username"
            type="text"
            value={username}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={onInputChange}
            name="password"
            type="text"
            value={password}
          />
        </div>
        <Button>Log In</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </form>
    </div>
  ) : null;
});

export default LoginModal;
