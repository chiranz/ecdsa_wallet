import type { NextApiRequest, NextApiResponse } from "next";
import Transfer from "../../models/Transfer";
import dbConnect from "../../utils/database";

dbConnect();

export default async function wallets(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const transfers = await Transfer.find({})
      .sort({ created_at: -1 })
      .limit(5)
      .exec();
    return res.status(200).json({ success: true, transfers });
  } catch (err) {
    return res.status(500).json({
      success: false,
      global: "Something went wrong on server side!",
    });
  }
}
