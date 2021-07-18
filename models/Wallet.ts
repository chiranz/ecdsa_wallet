import mongoose from "mongoose";

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

export default mongoose.models.Wallet || mongoose.model("Wallet", WalletSchema);
