import type { NextApiRequest, NextApiResponse } from "next";
import { verifyTransaction } from "../../helpers";
import Wallet from "../../models/Wallet";
import Transfer from "../../models/Transfer";
import dbConnect from "../../utils/database";
import UTXO, { UTXODocument } from "../../models/UTXO";
import Transaction from "../../models/Transaction";

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
    if (verified && _recepient && _sender) {
      // TODO: find all the utxos of sender upto the amount and fees
      // TODO: set utxos to transaction field with inputs and outputs
      try {
        let senderUtxos = await UTXO.find({ owner: _sender._id });
        let utxoSum = 0;

        const transaction = new Transaction({ fee, amount });

        for (let utxo of senderUtxos) {
          if (!utxo.spent) {
            transaction.inputs.push(utxo._id);
            utxoSum += utxo.amount;
          }
          if (utxoSum >= amount + fee) {
            // extra amount in utxo
            const diffAmount = utxoSum - (amount + fee);
            // additional utxo to reach transfer amount
            const senderUtxo = await UTXO.create({
              owner: _sender._id,
              amount: diffAmount,
            });
            const recieveAmount = utxo.amount - diffAmount - fee;
            const recieverUtxo = await UTXO.create({
              owner: _recepient._id,
              amount: recieveAmount,
            });

            transaction.outputs.push(recieverUtxo._id);
            transaction.outputs.push(senderUtxo._id);
            break;
          }
          const recieverUtxo = await UTXO.create({
            owner: _recepient._id,
            amount: utxo.amount,
          });
          transaction.outputs.push(recieverUtxo._id);
        }

        await transaction.save();
        return res.status(200).json({ success: true });
      } catch (err) {
        return res
          .status(500)
          .json({ success: false, globalErr: "Opps!! something went wrong" });
      }
    }
  }
  return res
    .status(400)
    .json({ success: false, globalErr: "Only ['POST'] method allowed!" });
}
