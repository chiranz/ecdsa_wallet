import React from "react";
import { WalletContext, WalletContextType } from "../context/WalletContext";
import styles from "./styles/GlobalMessage.module.css";

export default function GlobalMessage() {
  const { globalMessage } = React.useContext(
    WalletContext
  ) as WalletContextType;
  if (globalMessage.length) {
    return <div className={styles.messageBox}>{globalMessage}</div>;
  }
  return null;
}
