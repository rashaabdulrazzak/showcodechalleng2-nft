import environment from "./config";
import { connect, Contract, keyStores, WalletConnection } from "near-api-js";

const nearEnv = environment("testnet");
console.log(nearEnv);
export async function initializeContract() {
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearEnv
    )
  );
  window.walletConnection = new WalletConnection(near);
  window.accountId = window.walletConnection.getAccountId();
  window.contract = new Contract(
    window.walletConnection.account(),
    nearEnv.contractName,
    {
      viewMethods: ["nft_tokens_for_owner"],
      changeMethods: ["nft_mint"],
    }
  );
}
// login function
export function login() {
  window.walletConnection.requestSignIn(nearEnv.contractName);
}

// logout
export function logout() {
  window.walletConnection.signOut();
  window.location.reload();
}
