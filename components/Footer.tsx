import React, { ReactElement } from "react";
import styles from "./styles/Footer.module.css";

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
      <br />
      <br />
      <a
        className={styles.link}
        href="https://github.com/chiranz/ecdsa_wallet"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github Repo
      </a>
    </footer>
  );
}
