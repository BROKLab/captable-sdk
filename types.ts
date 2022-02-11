export type Signer = {
  address: string;
};
export type SignedMessage = {};
export type Organisation = {};
export type CapTable = {};
export type TransactionHash = {};

// Dummy Fagsystem user
export type RegisteredUser = {
  user: string;
  ethAddress: string;
  password: string;
  fnr: string;
  name: string;
  email: string;
};

export type PendingTransfer = {
  to: string;
  from: string;
  partiton: string;
  boardDirectorAddress: string;
  captableAddress: string;
  // ceramic uri
  publicStorageRef: string;
};

// Handled by BRØK. Immutable blockchain data. No personal info!
export interface ShareholderBlockchain {
  ethAddress?: string;
  amount: string;
  partition: string;
  ceramicURI: string;
}

// Put in Fagsystem db
export interface ShareholderPrivate {
  ssn: string;
  email: string;
  ceramicURI: string;
}

// Handled by BRØK. Stored in mutable "blockchain"
export type ShareholderCeramic = {
  name: string;
  birthyear: string;
  postalcode: string;
  ethAddress: string;
  identificator: {
    // SSN is encrypted with public key for each of them
    SSNForBoardDirector: string;
    SSNForFagsystem: string;
  };
};

export type Shareholder = {
  ceramic: ShareholderCeramic;
  blockchain: ShareholderBlockchain;
  private: ShareholderPrivate;
};

export type FullCapTable = {
  shareholders: Shareholder[];
  orgnr: string;
  name: string;
};
