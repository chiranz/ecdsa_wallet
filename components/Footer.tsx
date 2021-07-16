import React, { ReactElement } from "react";
import styles from "./Footer.module.css";

interface Props {}

export default function Footer({}: Props): ReactElement {
  return (
    <footer className={styles.footer}>
      Prepared by{" "}
      <a
        className={styles.link}
        href="https://github.com/chiranz"
        target="_blank"
        rel="noopener noreferrer"
      >
        Chiranjibi
      </a>
    </footer>
  );
}
