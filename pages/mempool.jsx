import React from "react";
import MempoolTable from "../components/MempoolTable";
import Button from "../components/Button";

export default function Mempool() {
  const handleMine = () => {
    console.log("Mining...");
  };
  return (
    <div style={{ width: "100%", marginBottom: "4rem" }}>
      <h2>Mempool</h2>
      <MempoolTable />
      <div style={{ textAlign: "right" }}>
        <Button onClick={() => {}}>Mine</Button>
      </div>
    </div>
  );
}
