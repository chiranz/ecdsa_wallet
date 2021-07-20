import axios from "axios";
import Head from "next/head";
import React, { useState } from "react";
import AddressTable from "../components/AddressTable";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Transfer from "../components/Transfer";
import TransfersTable from "../components/TransfersTable";
import { WalletContext, WalletContextType } from "../context/WalletContext";
import { getWalletFromPrivateKey } from "../helpers";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [_privateKey, _setPrivateKey] = useState("");
  const { wallet, setWallet, setGlobalMessage } = React.useContext(
    WalletContext
  ) as WalletContextType;
  const handleConnect = async () => {
    try {
      const { privateKey, publicKey } = getWalletFromPrivateKey(_privateKey);
      const response = await axios.get(`/api/connect/${publicKey}`);
      console.log(response);

      window.localStorage.setItem("tkn_private_key", privateKey);
      window.localStorage.setItem("tkn_public_key", publicKey);
      setWallet({ publicKey, privateKey });
      setGlobalMessage("Wallet connected successfully!");
      setTimeout(() => {
        setGlobalMessage("");
      }, 3000);
    } catch (err: any) {
      console.log(err.message);
      setGlobalMessage(err.message);
      setTimeout(() => {
        setGlobalMessage("");
      }, 3000);
      return;
    }
    // TODO: Save private key & public key in local storage
    // TODO: connect to database using the public key
  };
  return (
    <>
      <Head>
        <title>ECDSA | Home</title>
        <meta name="description" content="minimal crypto wallet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {!wallet.privateKey.length ? (
          <div>
            <h2>Connect Wallet</h2>
            <div>
              <InputField
                placeholder="your private key"
                value={_privateKey}
                onChange={(e) => _setPrivateKey(e.target.value)}
              />
            </div>
            <Button onClick={handleConnect}>Connect</Button>
          </div>
        ) : (
          <Transfer />
        )}
      </main>
      <TransfersTable />
      <AddressTable />
    </>
  );
}
