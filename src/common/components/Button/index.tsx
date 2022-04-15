import { memo } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ text, onClick, disabled }: ButtonProps) {
  return (
    <button
      className={styles.container}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default memo(Button);
