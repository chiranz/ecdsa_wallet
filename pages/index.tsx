import axios from "axios";
import Head from "next/head";
import React, { useState } from "react";
import Block from "../components/Block";
import { WalletContext, WalletContextType } from "../context/WalletContext";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [_privateKey, _setPrivateKey] = useState("");
  const { setGlobalMessage } = React.useContext(
    WalletContext
  ) as WalletContextType;
  return (
    <>
      <Head>
        <title>ECDSA | Home</title>
        <meta name="description" content="minimal crypto wallet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 style={{ marginTop: "1rem" }} className="heading">
          Recent blocks
        </h1>
        <div className={styles.main}>
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
        </div>
      </main>
    </>
  );
}
