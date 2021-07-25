const EC = require("elliptic").ec;
const SHA256 = require("crypto-js/sha256");

const isValidSHAHash = (hash) => {
  const regexExp = /^[a-f0-9]{64}$/gi;
  return regexExp.test(hash);
};

const getWalletFromPrivateKey = (privateKey) => {
  if (!isValidSHAHash(privateKey)) {
    console.log("Not a valid hash converting it to SHA256");
    privateKey = SHA256(privateKey, "hex").toString();
    console.log("Valid Private key Created!");
  }

  const ec = new EC("secp256k1");
  const key = ec.keyFromPrivate(privateKey, "hex");
  const _privateKey = key.getPrivate().toString(16);
  console.log({ _privateKey, privateKey });
};

getWalletFromPrivateKey();

getWalletFromPrivateKey(123);
