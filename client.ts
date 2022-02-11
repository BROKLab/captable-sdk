import { savePrivateData } from "./server";
import { checkBalance, deployCaptable, insertPublicUserData as saveCeramicData, isWhitelisted } from "./shared";
import { FullCapTable, Organisation, RegisteredUser, ShareholderCeramic, TransactionHash, Signer, PendingTransfer } from "./types";

// paramter enableGaaS: Symfoni GaaS will pay the transaction gas instead of you or enduser, as-a-service

// //
// // Registration
// // SymfoniID here represents that this message is signed as a Verifiable Credential from Symfoni ID, which gives us users eth-address
// //
// export type signup = (wallet: Signer, user: RegisteredUser) => Promise<RegisteredUser>;
// export type login = (credentials: {}) => Promise<RegisteredUser>;

const fundMeWithEth = (userAddress: string): Promise<boolean> => {
  return;
};

const transfer = (amount: string, captableAddress: string, signer: Signer, enableGaaS: boolean): Promise<boolean> => {
  return;
};

// From TheGraph which indexes all transfer with ends up in the escrow contract (recipient is unknown/not kyc'ed)
const fetchPendingTransfers = (boardDirectorAddress: string): Promise<PendingTransfer[]> => {
  return;
};

// Boarddirector approve escrow transfer from one shareholder to another.
// Pending transfer requests is fetched from TheGraph when logging into a Fagsystem. This request contain
const approveEscrowTransfer = (ceramicData: ShareholderCeramic, boardDirectorWallet: Signer, enableGaaS: boolean): Promise<string> => {
  // approves to blockchain
  // generates a secret which is used by recipent to claim
  return Promise.resolve("XXXXXXSecretTobeSentToClaimerzXXXXXX");
};

// Recipient shareholder claims shares with a secret received in email or any medium
const confirmClaimShares = async (loggedInUser: RegisteredUser, secret: string, signer: Signer, enableGaaS: boolean): Promise<TransactionHash> => {
  const _isWhitelisted = await isWhitelisted(loggedInUser.ethAddress);
  if (!_isWhitelisted) return Error("User must be KYC'ed. You are not");

  const hasEnoughGas = (await checkBalance(loggedInUser.ethAddress)) >= 0.1;

  if (!hasEnoughGas) {
    const fundingSuccess = await fundMeWithEth(loggedInUser.ethAddress);
    if (!fundingSuccess) return Error("Could not fund. You have been funded too much already, maybe?");
  }

  // the actual blockchain transaction to claim shares
  await claim(secret, signer, enableGaaS);

  return "0xOkeverytinOkTx";
};

const claim = async (secret: string, signer: Signer, enableGaaS: boolean): Promise<TransactionHash> => {
  return Promise.resolve(true);
};

// Find all captables elligable for migration. Data from brreg
const listMigratableCaptablesForIdentity = (identity: string): Promise<Organisation[]> => {
  return;
};

// Process for registered users
const confirmCreateCaptable = async (loggedInUser: RegisteredUser, captableData: FullCapTable, signer: Signer): Promise<TransactionHash> => {
  const _isWhitelisted = await isWhitelisted(loggedInUser.ethAddress);
  if (!_isWhitelisted) return Error("User must be KYC'ed. You are not");

  const hasEnoughGas = (await checkBalance(loggedInUser.ethAddress)) >= 0.1;

  if (!hasEnoughGas) {
    const fundingSuccess = await fundMeWithEth(loggedInUser.ethAddress);
    if (!fundingSuccess) return Error("Could not fund. You have been funded too much already, maybe?");
  }

  const addresses: string[] = [];
  const amount: string[] = [];
  const ceramicURIs: string[] = [];

  // TODO Implement has atomic operation. Try catch: Rollback alt hvis noe feiler i steg savePrivate, saveCeramic, saveBlockchain
  await captableData.shareholders.forEach(async (x, i) => {
    await savePrivateData(x.private); // Handled by Fagsystem. In reality this is done out of the SDK
    ceramicURIs[i] = await saveCeramicData(x.ceramic, signer);
    addresses[i] = x.blockchain.ethAddress;
    amount[i] = x.blockchain.amount;
  });

  // Store on blockchain
  const captableAddress = await deployCaptable(captableData.name, captableData.orgnr, addresses, amount, ceramicURIs);

  if (!captableAddress.startsWith("0x")) {
    return Error("Something went wrong when deploying captable to blockchain");
  }

  return captableAddress;
};

const transferSharesBySecret = async (ceramicData: ShareholderCeramic, captableAddress: string, amount: string, wallet: Signer, enableGaaS: boolean): Promise<boolean> => {
  await saveCeramicData(ceramicData, wallet);
  return await transfer(amount, captableAddress, wallet, enableGaaS);
};
