import Head from "next/head";
import React, { useState } from "react";
import AddressTable from "../components/AddressTable";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Transfer from "../components/Transfer";
import { WalletContext, WalletContextType } from "../context/WalletContext";
import { getWalletFromPrivateKey } from "../helpers";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [privateKey, setPrivateKey] = useState("");
  const { wallet } = React.useContext(WalletContext) as WalletContextType;
  const handleConnect = () => {
    getWalletFromPrivateKey(privateKey);
    // TODO: Save private key & public key in local storage
    // TODO: connect to database using the public key

    console.log("Connecting...");
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
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
              />
            </div>
            <Button onClick={handleConnect}>Connect</Button>
          </div>
        ) : (
          <Transfer />
        )}
      </main>
      <AddressTable />
    </>
  );
}
