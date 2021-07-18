import React, { ReactElement } from "react";
import { WalletContext, WalletContextType } from "../context/WalletContext";
import AccountButton from "./AccountButton";
import styles from "./styles/Header.module.css";

export default function Header({}): ReactElement {
  const { wallet } = React.useContext(WalletContext) as WalletContextType;

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>ECDSA Wallet</div>
      <div className="nav-links">
        <span>{}</span>
        {wallet.publicKey ? (
          <span>{wallet.publicKey.slice(0, 10)}...</span>
        ) : (
          <AccountButton />
        )}
      </div>
    </nav>
  );
}
