import { ChangeEvent, memo, useState, type FC } from "react";

import { Button } from "components";
import { User } from "types";

import classes from "./LoginModal.module.scss";

type LoginModalProps = {
  isOpen: boolean;
};

const LoginModal: FC<LoginModalProps> = memo(({ isOpen }) => {
  const [formData, setFormData] = useState<User>({
    username: "",
    password: "",
  });

  const { password, username } = formData;

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
      <form className={classes.Form}>
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
      </form>
    </div>
  ) : null;
});

export default LoginModal;
