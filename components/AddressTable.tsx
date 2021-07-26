import React, { ReactElement } from "react";
import { GlobalContext, GlobalContextType } from "../context/Global";
import styles from "./styles/Table.module.css";

interface Props {}

export default function AddressTable({}: Props): ReactElement {
  const { wallets, transfers } = React.useContext(
    GlobalContext
  ) as GlobalContextType;
  console.log(transfers);
  return (
    <div style={{ width: "100%", marginBottom: "4rem" }}>
      <h1>Registered Wallets</h1>
      <table style={{ width: "100%" }}>
        <thead style={{ width: "100%" }}>
          <tr className={styles.tableRow}>
            <td>Sl No</td>
            <td>Address</td>
            <td>Balance</td>
          </tr>
        </thead>
        <tbody style={{ width: "100%" }}>
          {wallets ? null : <tr>Loading...</tr>}
          {wallets &&
            wallets.map((wallet, index) => (
              <tr key={index} className={styles.tableRow}>
                <td>{index + 1}</td>
                <td>{wallet.publicKey}</td>
                <td>{wallet.balance}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
