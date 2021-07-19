import React, { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  children: React.ReactNode;
}
type WalletType = {
  publicKey?: string;
  balance?: number;
  privateKey?: string;
};
type TransferType = {
  from: string;
  to: string;
  amount: number;
  created_at?: string;
};

export type WalletContextType = {
  wallets: WalletType[];
  transfers: TransferType[];
  wallet: { privateKey: string; publicKey: string };
  setWallet: (value: WalletType) => {};
  globalMessage: string;
  setGlobalMessage: (value: string) => {};
  refreshData: () => void;
};

export const WalletContext = React.createContext({});

export const WalletProvider = ({ children }: Props) => {
  const [wallet, setWallet] = React.useState<WalletType>({
    privateKey: "",
    publicKey: "",
  });
  const [globalMessage, setGlobalMessage] = useState("");
  const [wallets, setWallets] = useState([]);
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
    setWallets(walletsRes.data.wallets);
    setTransfers(transfersRes.data.transfers);
  }
  useEffect(() => {
    // Todo: Fetch from api and set data
    init();
  }, []);
  const refreshData = () => {
    init();
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        setWallet,
        wallets,
        globalMessage,
        setGlobalMessage,
        refreshData,
        transfers,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
