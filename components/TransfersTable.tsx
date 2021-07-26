import dayjs from "dayjs";
import relativePlugin from "dayjs/plugin/relativeTime";
import React, { ReactElement } from "react";
import { GlobalContext, GlobalContextType } from "../context/Global";
import styles from "./styles/Table.module.css";

dayjs.extend(relativePlugin);
interface Props {}

export default function TransfersTable({}: Props): ReactElement {
  const { transfers } = React.useContext(GlobalContext) as GlobalContextType;
  return (
    <div style={{ width: "100%", marginBottom: "4rem" }}>
      <h1>Recent Transfers</h1>
      <table style={{ width: "100%" }}>
        <thead style={{ width: "100%" }}>
          <tr className={styles.tableRow}>
            <td>Sl No</td>
            <td>Time</td>
            <td>From</td>
            <td>To</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody style={{ width: "100%" }}>
          {transfers ? null : <tr>Loading...</tr>}
          {transfers &&
            transfers.map((transfer, index) => (
              <tr key={index} className={styles.tableRow}>
                <td>{index + 1}</td>
                <td>{dayjs(transfer.created_at).fromNow()}</td>
                <td>{transfer.from.slice(0, 10)}...</td>
                <td>{transfer.to.slice(0, 10)}...</td>
                <td>{transfer.amount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
