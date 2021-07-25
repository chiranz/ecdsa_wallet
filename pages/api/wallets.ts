import type { NextApiRequest, NextApiResponse } from "next";
import UTXO from "../../models/UTXO";
import Wallet from "../../models/Wallet";
import dbConnect from "../../utils/database";

dbConnect();

export default async function wallets(
  req: NextApiRequest,
  res: NextApiResponse
) {
  Wallet.find({}, async (err, wallets) => {
    if (err)
      return res.status(500).json({
        success: false,
        global: "Something went wrong on server side!",
      });

    for (let i = 0; i < wallets.length; i++) {
      const wallet = wallets[i];
      let balance = 0;
      const walletUTXOs = await UTXO.find({
        owner: wallet._id,
        spent: false,
        mined: true,
      });

      for (let utxo of walletUTXOs) {
        balance += utxo.amount;
      }
      wallets[i]._doc.balance = balance;
    }

    return res.status(200).json({ success: true, wallets });
  });
  return;
}
