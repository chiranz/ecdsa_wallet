
import type { NextApiRequest, NextApiResponse } from "next";
import Transaction from "../../models/Transaction";
import dbConnect from "../../utils/database";
const FEE = 1

dbConnect();

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
	//  TODO: Verify that the signature is valid

	// TODO: Once signature is valid 
    try {
      const {  from, amount, to } = req.body;
	//   TODO: Filter unspent UTXO's of the spender
	// TODO: Add utxo to the inputs until the value reaches the amount
	  const utxoSum: number = 0

	  while (amount < utxoSum + FEE){

	  }
      const txn = await Transaction.create({});
      txn.save();
      return res.status(201).send({ success: true, txn });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, globalErr: "Opps!! something went wrong" });
    }
  }

  return res.status(400).json({
    success: false,
    globalErr: "allowed requests ['POST', 'DELETE'] only",
  });
}
