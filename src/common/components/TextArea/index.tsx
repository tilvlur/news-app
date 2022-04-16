import { ChangeEvent, memo } from "react";
import styles from "./TextArea.module.scss";

interface TextareaProps {
  htmlFor?: string;
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({
  htmlFor,
  label,
  value,
  placeholder,
  onChange,
}: TextareaProps) {
  return (
    <label htmlFor={htmlFor}>
      <div className={styles.label}>{label}</div>
      <textarea
        className={styles.textarea}
        id={htmlFor}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
}

export default memo(TextArea);
