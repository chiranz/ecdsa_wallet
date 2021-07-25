import React, { ReactElement } from "react";
import Link from "next/link";
import { WalletContext, WalletContextType } from "../context/WalletContext";
import AccountButton from "./AccountButton";
import styles from "./styles/Header.module.css";

export default function Header({}): ReactElement {
  const { wallet } = React.useContext(WalletContext) as WalletContextType;

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <a className={styles.brand}>FITCOIN</a>
      </Link>
      <div className="nav-links">
        {wallet.publicKey ? (
          <>
            <Link href="/mempool">
              <a className={styles.navLink}>
                Mempool
                <span className={styles.badge}></span>
              </a>
            </Link>
            <Link href="/wallet">
              <a className={styles.navLink}>
                {wallet.publicKey.slice(0, 10)}...
              </a>
            </Link>
          </>
        ) : (
          <AccountButton />
        )}
      </div>
    </nav>
  );
}
