import { Schema, models, model, Document } from "mongoose";

const BlockchainSchema = new Schema<IBlockchain>({
  name: {
    type: String,
    default: "Fitcoin",
  },
  blocks: [{ type: Schema.Types.ObjectId, ref: "Block" }],
});

BlockchainSchema.methods.name = function () {
  return this.name;
};

// TODO: Sort blocks by timestamp and send it to the frontend

export default models.Blockchain || model("Blockchain", BlockchainSchema);
