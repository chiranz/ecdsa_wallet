interface ITransaction {
  inputs: IUTXO[];
  outputs: IUTXO[];
}

interface IBlock {
  timestamp: Date;
  nonce: number;
  previousHash: string;
  transactions: ITransaction[];
}

interface IBlockchain extends Document {
  name: string;
  blocks: IBlock[];
}

interface IUTXO {
  owner: string;
  amount: number;
  spent: boolean;
  mined: boolean;
}

interface IWallet {
  privateKey: string;
}
