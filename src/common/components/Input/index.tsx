import { ChangeEvent, memo } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  htmlFor: string;
  label: string;
  type: "text" | "number" | "password";
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ htmlFor, label, type, value, onChange }: InputProps) {
  return (
    <label htmlFor={htmlFor}>
      <div className={styles.label}>{label}</div>
      <input
        id={htmlFor}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export default memo(Input);
