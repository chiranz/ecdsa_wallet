import { Schema, models, model, Document, ObjectId } from "mongoose";
interface TTransaction {
  inputs: ObjectId[];
  outputs: ObjectId[];
  amount: Number;
}

interface TransactionDocument extends Document, TTransaction {}

const TransactionSchema = new Schema({
  inputs: {
    type: [{ type: Schema.Types.ObjectId, ref: "UTXO" }],
  },
  outputs: {
    type: [{ type: Schema.Types.ObjectId, ref: "UTXO" }],
  },
  amount: {
    type: Number,
  },
  fee: {
    type: Number,
  },
});

// TODO: add utxos to the mempool
// TODO: how to handle outputs
// TODO: how to provide fees to the miner
TransactionSchema.methods.execute = function () {};

export default models.Transaction ||
  model<TransactionDocument>("Transaction", TransactionSchema);
