import React, { ReactElement } from "react";
import styles from "./InputField.module.css";

interface Props {
  type?: string;
  placeholder: string;
  onChange: () => void;
}

export default function InputField({
  type = "text",
  placeholder,
  onChange,
}: Props): ReactElement {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
