import { ChangeEvent, memo } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  htmlFor?: string;
  label?: string;
  type: "text" | "number" | "password";
  value: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isLabel?: boolean;
}

function Input({
  htmlFor,
  label,
  type,
  value,
  placeholder,
  onChange,
  isLabel = true,
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
      />
    </label>
  ) : (
    <input
      className={styles.input}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default memo(Input);
