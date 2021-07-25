import { Schema, models, model } from "mongoose";

const BlockSchema = new Schema({
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  nonce: {
    type: Number,
  },
  previousHash: {
    type: String,
    required: true,
  },
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
  hash: {
    type: String,
    required: true,
  },
});

export default models.Block || model("Block", BlockSchema);
