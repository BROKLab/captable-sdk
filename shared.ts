import { RegisteredUser, ShareholderCeramic, Signer } from "./types";

export const isWhitelisted = (userAddress: string): Promise<boolean> => {
  return;
};

// Ceramic
export const findUsersForCaptable = (captableAddress: string): Promise<RegisteredUser[]> => {
  return;
};

export const findUser = (ceramicURI: string): Promise<RegisteredUser> => {
  return;
};

export const insertPublicUserData = (shareholderCeramic: ShareholderCeramic, signer: Signer): Promise<string> => {
  // const uri = await ceramic.save(shareholderCeramic)
  return Promise.resolve("ceramic://0x9998877");
};

export const deployCaptable = (name: string, orgnr: string, addresses: string[], amounts: string[], ceramicURIs: string[]): Promise<string> => {
  return;
};

export const checkBalance = (userAddress: string): Promise<number> => Promise.resolve(0.1);
