import type { NextApiRequest, NextApiResponse } from "next";
import { Wallet } from "../../models/Wallet";
import dbConnect from "../../utils/database";

dbConnect();

export default async function wallets(
  req: NextApiRequest,
  res: NextApiResponse
) {
  Wallet.find({}, (err, wallets) => {
    if (err)
      return res.status(500).json({
        success: false,
        global: "Something went wrong on server side!",
      });
    return res.status(200).json({ success: true, wallets });
  });
  return;
}
