import mongoose, { Model, Document } from "mongoose";

export interface IWallet extends Document {
  from: String;
  to: String;
  amount: Number;
}

const TransferSchema = new mongoose.Schema({
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  amount: {
    type: Number,
  },
});

export const Transfer: Model<IWallet> =
  mongoose.models.Transfer || mongoose.model("Transfer", TransferSchema);
