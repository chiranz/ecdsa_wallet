import { Schema, models, model, Document } from "mongoose";

export interface UTXODocument extends IUTXO, Document {}

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
    default: false,
  },
  mined: {
    type: Boolean,
    default: false,
  },
});

export default models.UTXO || model<UTXODocument>("UTXO", UTXOSchema);
