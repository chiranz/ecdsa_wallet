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
});

export default mongoose.models.Transfer ||
  mongoose.model("Transfer", TransferSchema);
