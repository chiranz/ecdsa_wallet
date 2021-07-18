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

export type WalletContextType = {
  wallets: WalletType[];
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
  async function init() {
    if (window) {
      const _privateKey = window.localStorage.getItem("tkn_private_key");
      const _publicKey = window.localStorage.getItem("tkn_public_key");
      setWallet({
        privateKey: _privateKey || "",
        publicKey: _publicKey || "",
      });
    }

    const res = await axios.get("/api/wallets");
    setWallets(res.data.wallets);
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
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
