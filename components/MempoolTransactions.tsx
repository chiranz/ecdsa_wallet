import dayjs from "dayjs";
import relativePlugin from "dayjs/plugin/relativeTime";
import React, { ReactElement } from "react";
import { GlobalContext, GlobalContextType } from "../context/Global";
import styles from "./styles/MempoolTransactions.module.css";
import ReactJsonPretty from "react-json-pretty";

const themeJson = {
  main: "line-height:1.3;color:#66d9ef;background:#272822;overflow:scroll;height:15rem;",
  error: "line-height:1.3;color:#66d9ef;background:#272822;overflow:scroll;",
  key: "color:#f92672;",
  string: "color:#fd971f;",
  value: "color:#a6e22e;",
  boolean: "color:#ac81fe;",
};

dayjs.extend(relativePlugin);
interface Props {}

export default function MempoolTransactions({}: Props): ReactElement {
  const { mempool } = React.useContext(GlobalContext) as GlobalContextType;
  return (
    <div className={styles.container}>
      <div className={styles.rowHeading}>
        <h3>Txn Detail</h3>
        <h3>Input Utxos</h3>
        <h3>Output Utxos</h3>
      </div>
      {mempool.map((txn, id) => {
        return (
          <div key={id} className={styles.row}>
            <div className={styles.details}>
              <h3>Item No: {id + 1}</h3>
              <h3 className="text_secondary">Amount: {txn.amount} TKN</h3>

              <h4 className="text_secondary">Fee: {txn.fee} TKN</h4>
            </div>
            <div className={styles.utxos}>
              <ReactJsonPretty
                theme={themeJson}
                data={JSON.stringify(txn.inputs, null, 2)}
              ></ReactJsonPretty>
            </div>
            <div className={styles.utxos}>
              <ReactJsonPretty
                theme={themeJson}
                data={txn.outputs}
              ></ReactJsonPretty>
            </div>
          </div>
        );
      })}
    </div>
  );
}
