import { Schema, models, model } from "mongoose";

const UTXOSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "wallet",
  },
  amount: {
    type: Number,
    required: true,
  },
  spent: {
    type: Boolean,
    required: true,
  },
});

export default models.UTXO || model("UTXO", UTXOSchema);
