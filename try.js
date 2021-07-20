const EC = require("elliptic").ec;

const getWalletFromPrivateKey = (
  privateKey = "9f8d15ae5260a9d946890ff12b83aeddf781ef7201dd71ee7e30902d8d9b1aad"
) => {
  console.log(privateKey.length);
  const ec = new EC("secp256k1");
  const key = ec.keyFromPrivate(privateKey, "hex");
  const _privateKey = key.getPrivate().toString(16);
  console.log({ _privateKey, privateKey });
};

getWalletFromPrivateKey();
