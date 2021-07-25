import { Schema, Document, model, models } from "mongoose";
export interface WalletDocument extends IWallet, Document {}

const WalletSchema = new Schema({
  publicKey: {
    type: String,
    unique: true,
  },
});

export default models.Wallet || model<WalletDocument>("Wallet", WalletSchema);
