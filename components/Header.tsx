import React, { ReactElement } from "react";
import CreateWalletButton from "./CreateWalletButton";
import styles from "./Header.module.css";

export default function Header({}): ReactElement {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>ECDSA Wallet</div>
      <div className="nav-links">
        <CreateWalletButton />
      </div>
    </nav>
  );
}
