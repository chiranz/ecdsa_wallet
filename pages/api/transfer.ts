import type { NextApiRequest, NextApiResponse } from "next";
import { verifyTransaction } from "../../helpers";
import Wallet from "../../models/Wallet";
import Transfer from "../../models/Transfer";
import dbConnect from "../../utils/database";

dbConnect();

export default async function wallet(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { r, s, publicKey, to, amount } = req.body;
    const verified = verifyTransaction({ r, s, publicKey, to, amount });
    const _recepient = await Wallet.findOne({ publicKey: to });
    const _sender = await Wallet.findOne({ publicKey });

    if (!_recepient) {
      return res
        .status(400)
        .json({ success: false, globalErr: "Wrong recepient address" });
    }

    console.log("Here");
    console.log(verified);
    if (verified && _recepient && _sender) {
      _sender.balance -= amount;
      _recepient.balance += amount;
      console.log(typeof amount);
      try {
        await _sender.save();
        await _recepient.save();
        const transfer = await Transfer.create({ amount, from: publicKey, to });
        return res.status(200).json({ success: true, data: transfer });
      } catch (err) {
        return res
          .status(400)
          .json({ success: false, globalErr: "Opps!! transfer failed" });
      }
    }
  }
  return res
    .status(400)
    .json({ success: false, globalErr: "Only ['POST'] method allowed!" });
}
