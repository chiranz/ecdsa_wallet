import type { NextApiRequest, NextApiResponse } from "next";
import { verifyTransaction } from "../../helpers";
import Wallet from "../../models/Wallet";
import Transfer from "../../models/Transfer";
import dbConnect from "../../utils/database";
import UTXO, { UTXODocument } from "../../models/UTXO";

dbConnect();

export default async function wallet(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { r, s, publicKey, to, amount, fee } = req.body;
    const verified = verifyTransaction({ r, s, publicKey, to, amount, fee });
    if (!verified) {
      return res
        .status(400)
        .json({ success: false, globalErr: "Verification failed! " });
    }
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
      // TODO: find all the utxos of sender upto the amount and fees
      // TODO: set utxos to transaction field with inputs and outputs
      let inputUtxos = [];
      let userUtxos = await UTXO.find({}, { _id: _sender._doc._id });
      let utxoSum = 0;

      for (let utxo of userUtxos) {
        if (!utxo.spent) {
          inputUtxos.push(utxo);
          utxoSum += utxo.amount;
        }
        if (utxoSum >= amount + fee) break;
      }
      console.log(inputUtxos);
      return res.status(200).json({ success: true });
      // try {
      //   await _sender.save();
      //   await _recepient.save();
      //   const transfer = await Transfer.create({ amount, from: publicKey, to });
      //   return res.status(200).json({ success: true, data: transfer });
      // } catch (err) {
      //   return res
      //     .status(400)
      //     .json({ success: false, globalErr: "Opps!! transfer failed" });
      // }
    }
  }
  return res
    .status(400)
    .json({ success: false, globalErr: "Only ['POST'] method allowed!" });
}
