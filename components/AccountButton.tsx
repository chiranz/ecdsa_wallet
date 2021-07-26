import React, { ReactElement } from "react";
import Button from "./Button";
import { generateWallet } from "../helpers";
import axios from "axios";
import { GlobalContext, GlobalContextType } from "../context/Global";

export default function AccountButton(): ReactElement {
  const { setGlobalMessage, setWallet } = React.useContext(
    GlobalContext
  ) as GlobalContextType;
  const handleCreateWallet = async () => {
    const { privateKey, publicKey } = generateWallet();
    const response = await axios.get(`/api/connect/${publicKey}`);
    console.log(response);

    window.localStorage.setItem("tkn_private_key", privateKey);
    window.localStorage.setItem("tkn_public_key", publicKey);
    setWallet({ publicKey, privateKey });
    setGlobalMessage("Wallet Created successfully!");
    setTimeout(() => {
      setGlobalMessage("");
    }, 3000);
  };
  return <Button onClick={handleCreateWallet}>Create</Button>;
}
