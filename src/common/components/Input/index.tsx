import { ChangeEvent, memo } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  htmlFor?: string;
  label?: string;
  type: "text" | "number" | "search" | "password";
  value: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isLabel?: boolean;
  ariaLabel?: string;
}

function Input({
  htmlFor,
  label,
  type,
  value,
  placeholder,
  onChange,
  isLabel = true,
  ariaLabel,
}: InputProps) {
  return isLabel ? (
    <label htmlFor={htmlFor}>
      <div className={styles.label}>{label}</div>
      <input
        id={htmlFor}
        className={styles.input}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-label={ariaLabel}
      />
    </label>
  ) : (
    <input
      className={styles.input}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      aria-label={ariaLabel}
    />
  );
}

export default memo(Input);
