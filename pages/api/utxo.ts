import type { NextApiRequest, NextApiResponse } from "next";
import UTXO from "../../models/UTXO";
import dbConnect from "../../utils/database";

dbConnect();

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { owner, amount, spent } = req.body;
      const utxo = await UTXO.create({ owner, amount, spent });
      utxo.save();
      return res.status(201).send({ success: true, utxo });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, globalErr: "Opps!! something went wrong" });
    }
  }
  if (req.method === "DELETE") {
    try {
      await UTXO.deleteMany({});
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false });
    }
  }
  return res.status(400).json({
    success: false,
    globalErr: "allowed requests ['POST', 'DELETE'] only",
  });
}
