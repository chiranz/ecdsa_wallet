import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/database";
import UTXO, { UTXODocument } from "../../models/UTXO";
import Transaction from "../../models/Transaction";

dbConnect();

export default async function mempool(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const pendingTxs = await Transaction.find({})
        .populate({
          path: "inputs",
          populate: {
            path: "owner",
            select: "publicKey",
            model: "Wallet",
          },
        })
        .populate({
          path: "outputs",
          populate: {
            path: "owner",
            select: "publicKey",
            model: "Wallet",
          },
        });

      return res.status(200).json({ success: true, transactions: pendingTxs });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, globalErr: "Opps! Something went wrong" });
    }
  }
  return res
    .status(400)
    .json({ success: false, globalErr: "Only ['GET'] method allowed!" });
}
