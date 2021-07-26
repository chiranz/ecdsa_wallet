import React from "react";
import { GlobalContext, GlobalContextType } from "../context/Global";
import styles from "./styles/GlobalMessage.module.css";

export default function GlobalMessage() {
  const { globalMessage } = React.useContext(
    GlobalContext
  ) as GlobalContextType;
  if (globalMessage.length) {
    return <div className={styles.messageBox}>{globalMessage}</div>;
  }
  return null;
}
