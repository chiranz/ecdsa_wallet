import type { NextApiRequest, NextApiResponse } from "next";
import UTXO from "../../../models/UTXO";
import Wallet from "../../../models/Wallet";
import dbConnect from "../../../utils/database";

dbConnect();

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { publicKey } = req.query;

  let wallet;
  if (req.method === "GET") {
    wallet = await Wallet.findOne({ publicKey });
    if (wallet) {
      return res.status(200).send({ success: true, wallet });
    } else {
      try {
        wallet = await Wallet.create({ publicKey });
        await UTXO.create({
          owner: wallet._id,
          amount: 100,
        });
        return res.status(201).send({ success: true, wallet });
      } catch (err) {
        return res
          .status(500)
          .json({ success: false, globalErr: "Opps!! something went wrong" });
      }
    }
  }
  return res.status(400).json({
    success: false,
    globalErr: "allowed requests ['GET'] only",
  });
}
