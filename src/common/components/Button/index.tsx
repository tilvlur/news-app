import { memo } from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  variants?: "base" | "delete";
}

function Button({ text, onClick, disabled, variants = "base" }: ButtonProps) {
  const buttonStyle = classNames(styles.container, {
    [styles.container_base]: variants === "base",
    [styles.container_delete]: variants === "delete",
  });

  return (
    <button
      className={buttonStyle}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default memo(Button);
