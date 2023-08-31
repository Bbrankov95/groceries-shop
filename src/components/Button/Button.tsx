import { ReactNode, memo, FC } from "react";

type ButtonProps = {
  children: ReactNode;
  type?: HTMLButtonElement["type"];
  onClick?: () => unknown;
  disabled?: boolean;
  className?: string;
};

const Button: FC<ButtonProps> = memo(
  ({ children, type, onClick, disabled, className }) => {
    return (
      <button
        className={className}
        disabled={disabled}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    );
  }
);

export default Button;
