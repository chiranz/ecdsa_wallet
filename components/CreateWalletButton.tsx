import React, { ReactElement } from "react";
import { ec as EC } from "elliptic";
import Button from "./Button";

export default function CreateWalletButton(): ReactElement {
  const handleClick = () => {
    const ec = new EC("secp256k1");
    const key = ec.genKeyPair();
    const privateKey = key.getPrivate().toString();
    window.localStorage.setItem("tkn_private_key", privateKey);
  };
  return <Button onClick={handleClick}>Create</Button>;
}
