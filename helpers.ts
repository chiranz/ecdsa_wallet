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
  fee: number;
};

export const signTransaction = ({
  to,
  amount,
  privateKey,
  fee,
}: TxnInputs): SignedTxn => {
  const ec = new EC("secp256k1");
  const key = ec.keyFromPrivate(privateKey);
  const publicKey = key.getPublic().encode("hex", true).toString();

  // TODO: change this message to whatever you would like to sign
  const txn = { to, amount, fee };
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
    fee,
    publicKey,
    r: signature.r.toString(16),
    s: signature.s.toString(16),
  };
};
interface ISignaturePub {
  r: string;
  s: string;
  publicKey: string;
}
interface SignedTxn extends ISignaturePub {
  to: string;
  amount: number;
  fee: number;
}
export const verifyData = (
  publicKey: string,
  data: {},
  r: string,
  s: string
): boolean => {
  const ec = new EC("secp256k1");

  const key = ec.keyFromPublic(publicKey, "hex");

  const dataHash = SHA256(JSON.stringify(data)).toString();

  const signature = {
    r,
    s,
  };

  const verified = key.verify(dataHash, signature);
  return verified;
};

export const verifyTransaction = ({
  publicKey,
  r,
  s,
  to,
  amount,
  fee,
}: SignedTxn): boolean => {
  const data = { to, amount, fee };
  return verifyData(publicKey, data, r, s);
};

interface IBlockData extends IBlock {
  privateKey?: string;
}
interface ISignedBlock extends ISignaturePub, IBlockData {}
export const signBlock = ({
  nonce,
  transactions,
  timestamp,
  hash,
  privateKey,
}: IBlockData): ISignedBlock => {
  const ec = new EC("secp256k1");
  const key = ec.keyFromPrivate(privateKey || "");
  const publicKey = key.getPublic().encode("hex", true).toString();

  // TODO: change this message to whatever you would like to sign
  const txn = { timestamp, transactions, nonce, hash };
  const txnHash = SHA256(JSON.stringify(txn));
  const signature = key.sign(txnHash.toString());
  console.log({
    timestamp,
    transactions,
    nonce,
    hash,
    publicKey,
    signature: {
      r: signature.r.toString(16),
      s: signature.s.toString(16),
    },
  });
  return {
    timestamp,
    transactions,
    nonce,
    hash,
    publicKey,
    r: signature.r.toString(16),
    s: signature.s.toString(16),
  };
};

export const verifyBlock = ({
  r,
  s,
  publicKey,
  nonce,
  transactions,
  timestamp,
  hash,
}: ISignedBlock): boolean => {
  const data = { timestamp, transactions, nonce, hash };

  return verifyData(publicKey, data, r, s);
};
