import dayjs from "dayjs";
import relativePlugin from "dayjs/plugin/relativeTime";
import React, { ReactElement } from "react";
import { WalletContext, WalletContextType } from "../context/WalletContext";
import Button from "./Button";
import styles from "./styles/Table.module.css";

dayjs.extend(relativePlugin);
interface Props {}

export default function MempoolTable({}: Props): ReactElement {
  const { transfers } = React.useContext(WalletContext) as WalletContextType;
  return (
    <table style={{ width: "100%" }}>
      <thead style={{ width: "100%" }}>
        <tr className={styles.tableRow}>
          <td>Sl No</td>
          <td>Input UTXO</td>
          <td>Output UTXO</td>
        </tr>
      </thead>
      <tbody style={{ width: "100%" }}>
        <tr className={styles.tableRow}>
          <td>1.</td>
          <td>
            <pre
              style={{
                color: "grey",
                overflow: "scroll",
                maxHeight: "10rem",
                maxWidth: "20rem",
              }}
            >
              {JSON.stringify(transfers, null, 2)}
            </pre>
          </td>
          <td>
            <pre
              style={{
                color: "grey",
                overflow: "scroll",
                maxHeight: "10rem",
                maxWidth: "20rem",
              }}
            >
              {JSON.stringify(transfers, null, 2)}
            </pre>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
