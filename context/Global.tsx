import React, { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  children: React.ReactNode;
}
type WalletType = {
  publicKey?: string;
  balance?: number | null;
  privateKey?: string;
};
type TransferType = {
  from: string;
  to: string;
  amount: number;
  created_at?: string;
};
interface IMempoolTxn {
  fee: string;
  amount: number;
  inputs: IUTXO[];
  outputs: IUTXO[];
}

export type GlobalContextType = {
  wallets: WalletType[];
  transfers: TransferType[];
  wallet: { privateKey: string; publicKey: string };
  setWallet: (value: WalletType) => {};
  globalMessage: string;
  setGlobalMessage: (value: string) => {};
  refreshData: () => void;
  mempool: IMempoolTxn[];
};

export const GlobalContext = React.createContext({});

export const GlobalProvider = ({ children }: Props) => {
  const [wallet, setWallet] = React.useState<WalletType>({
    privateKey: "",
    publicKey: "",
    balance: null,
  });
  const [globalMessage, setGlobalMessage] = useState("");
  const [wallets, setWallets] = useState([]);
  const [mempool, setMempool] = useState([]);
  const [transfers, setTransfers] = useState([]);
  async function init() {
    if (window) {
      const _privateKey = window.localStorage.getItem("tkn_private_key");
      const _publicKey = window.localStorage.getItem("tkn_public_key");
      setWallet({
        privateKey: _privateKey || "",
        publicKey: _publicKey || "",
      });
    }
    const transfersRes = await axios.get("/api/transfers");
    const walletsRes = await axios.get("/api/wallets");
    const mempoolRes = await axios.get("/api/mempool");
    setWallets(walletsRes.data.wallets);
    setTransfers(transfersRes.data.transfers);
    setMempool(mempoolRes.data.transactions);
  }
  useEffect(() => {
    // Todo: Fetch from api and set data
    init();
  }, []);
  const refreshData = () => {
    init();
  };

  return (
    <GlobalContext.Provider
      value={{
        wallet,
        setWallet,
        wallets,
        globalMessage,
        setGlobalMessage,
        refreshData,
        transfers,
        mempool,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
