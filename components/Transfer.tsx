import axios from "axios";
import React, { ReactElement, useState } from "react";
import { WalletContext, WalletContextType } from "../context/WalletContext";
import { signTransaction, verifyTransaction } from "../helpers";
import Button from "./Button";
import InputField from "./InputField";
import styles from "./styles/Transfer.module.css";

export default function Transfer(): ReactElement {
  const { wallet, setGlobalMessage, refreshData } = React.useContext(
    WalletContext
  ) as WalletContextType;

  const [_recepient, setRecepient] = useState("");
  const [_amount, setAmount] = useState(0);
  const [_fee, setFee] = useState(0);
  const handleSend = async () => {
    console.log("Sending transaction");
    const { publicKey, r, s, to, amount, fee } = signTransaction({
      privateKey: wallet.privateKey,
      amount: _amount,
      to: _recepient,
      fee: _fee,
    });
    //TODO:  Send transaction to the server
    try {
      await axios.post("/api/transfer", { publicKey, r, s, to, amount, fee });
    } catch (err) {
      console.log(err);
    }

    refreshData();
    setGlobalMessage(
      `Transferred ${amount} TKN from ${publicKey.slice(0, 5)}... to ${to.slice(
        0,
        5
      )}...`
    );
    setAmount(0);
    setRecepient("");
    setTimeout(() => {
      setGlobalMessage("");
    }, 3000);
  };
  console.log({ _recepient, _amount });
  return (
    <div>
      <div className={styles.boxShadow}>
        <h2>Transfer Fund</h2>
        <div className="input-field">
          <InputField
            placeholder="reciever address"
            value={_recepient}
            onChange={(e) => {
              setRecepient(e.target.value);
            }}
          />
        </div>
        <div className="input-field">
          <InputField
            placeholder="amount"
            type="number"
            value={_amount || ""}
            onChange={(e) => {
              setAmount(parseInt(e.target.value));
            }}
          />
        </div>
        <div className="input-field">
          <InputField
            placeholder="miner fee"
            type="number"
            value={_fee || ""}
            onChange={(e) => {
              setFee(parseInt(e.target.value));
            }}
          />
        </div>

        <Button disabled={!wallet.privateKey} onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
}
