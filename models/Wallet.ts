import mongoose, { Document, Model } from "mongoose";

export interface IWallet extends Document {
  publicKey: String;
  balance: Number | any;
}

const WalletSchema = new mongoose.Schema({
  publicKey: {
    type: String,
    unique: true,
  },
  balance: {
    type: Number,
    default: 100,
  },
});

export const Wallet: Model<IWallet> =
  mongoose.models.Wallet || mongoose.model("Wallet", WalletSchema);
