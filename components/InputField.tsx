import React, { ChangeEventHandler, ReactElement } from "react";
import styles from "./styles/InputField.module.css";

interface Props {
  type?: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value: string | number;
}

export default function InputField({
  type = "text",
  placeholder,
  onChange,
  disabled = false,
  value,
}: Props): ReactElement {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      value={value}
    />
  );
}
