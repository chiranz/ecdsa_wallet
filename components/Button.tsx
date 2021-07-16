import React, { ReactElement } from "react";
import styles from "./Button.module.css";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

export default function Button({ children, onClick }: Props): ReactElement {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
