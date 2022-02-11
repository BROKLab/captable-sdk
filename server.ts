import { ShareholderPrivate } from "./types";
// SERVER

import { SignedMessage, Signer } from "./types";

// paramter enableGaaS: Symfoni GaaS will pay the transaction gas instead of you or enduser, as-a-service

export const savePrivateData = (privateData: ShareholderPrivate): Promise<boolean> => {
  return;
};

const whitelistUser = (userAddress: string, signer: Signer, enableGaaS: boolean): Promise<boolean> => {
  return;
};

// Users need gas (ETH) to interact with the blockchain (create captable, transfer/sell tokens, etc.)
const fundUserWithEth = (userAddress: string, amount: number, signer: Signer, enableGaaS: boolean): Promise<boolean> => {
  return;
};
