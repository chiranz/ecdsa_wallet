import React from "react";
import MempoolTransactions from "../components/MempoolTransactions";
import Button from "../components/Button";

export default function Mempool() {
  const handleMine = () => {
    console.log("Mining...");
  };
  return (
    <div style={{ width: "100%", marginBottom: "4rem" }}>
      <h2>Mempool</h2>
      <MempoolTransactions />
      <div style={{ textAlign: "right", marginTop: "3rem" }}>
        <Button onClick={() => {}}>Mine</Button>
      </div>
    </div>
  );
}
