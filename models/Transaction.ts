import { Schema, models, model } from "mongoose";

const TransactionSchema = new Schema<ITransaction>({
  inputs: {
    type: [{ type: Schema.Types.ObjectId, ref: "UTXO" }],
  },
  outputs: {
    type: [{ type: Schema.Types.ObjectId, ref: "UTXO" }],
  },
});

// TODO: add utxos to the mempool
// TODO: how to handle outputs
// TODO: how to provide fees to the miner
TransactionSchema.methods.execute = function () {
  this.inputs.forEach((input: IUTXO) => {
    input.spent = true;
  });
};

export default models.Transaction || model("Transaction", TransactionSchema);
