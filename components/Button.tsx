import React, { ReactElement } from "react";
import styles from "./styles/Button.module.css";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  disabled,
}: Props): ReactElement {
  return (
    <button disabled={disabled} className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
