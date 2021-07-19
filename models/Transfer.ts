import mongoose from "mongoose";

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
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Transfer ||
  mongoose.model("Transfer", TransferSchema);
