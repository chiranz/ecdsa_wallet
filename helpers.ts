import { ec as EC } from "elliptic";
import SHA256 from "crypto-js/sha256";
type WalletProps = {
  privateKey: string;
  publicKey: string;
};

export const generateWallet = (): WalletProps => {
  const ec = new EC("secp256k1");
  const key = ec.genKeyPair();
  const privateKey = key.getPrivate().toString(16);
  const publicKey = key.getPublic().encode("hex", true).toString();
  console.log(privateKey.toString(), publicKey);
  return { privateKey, publicKey };
};

export const getWalletFromPrivateKey = (privateKey: string) => {
  const ec = new EC("secp256k1");
  const key = ec.keyFromPrivate(privateKey, "hex");
  const _privateKey = key.getPrivate().toString(16);
  console.log({ _privateKey, privateKey });
  if (_privateKey !== privateKey) {
    throw new Error("Please enter a valid private key!");
  }
  const publicKey = key.getPublic().encode("hex", true).toString();
  console.log(privateKey.toString(), publicKey);
  return { privateKey, publicKey };
};

type TxnInputs = {
  to: string;
  amount: number;
  privateKey: string;
};

export const signTransaction = ({
  to,
  amount,
  privateKey,
}: TxnInputs): SignedTxn => {
  const ec = new EC("secp256k1");
  const key = ec.keyFromPrivate(privateKey);
  const publicKey = key.getPublic().encode("hex", true).toString();

  // TODO: change this message to whatever you would like to sign
  const txn = { to, amount };
  const txnHash = SHA256(JSON.stringify(txn));
  const signature = key.sign(txnHash.toString());
  console.log({
    to,
    amount,
    publicKey,
    signature: {
      r: signature.r.toString(16),
      s: signature.s.toString(16),
    },
  });
  return {
    to,
    amount,
    publicKey,
    r: signature.r.toString(16),
    s: signature.s.toString(16),
  };
};
type SignedTxn = {
  r: string;
  s: string;
  publicKey: string;
  to: string;
  amount: number;
};

export const verifyTransaction = ({
  publicKey,
  r,
  s,
  to,
  amount,
}: SignedTxn): boolean => {
  const ec = new EC("secp256k1");

  const key = ec.keyFromPublic(publicKey, "hex");

  const txn = { to, amount };
  const txnHash = SHA256(JSON.stringify(txn)).toString();

  const signature = {
    r,
    s,
  };

  const verified = key.verify(txnHash, signature);
  console.log(verified);
  return verified;
};
