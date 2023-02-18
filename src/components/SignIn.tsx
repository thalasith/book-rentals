import { useState, useEffect, useCallback } from "react";
import { providers } from "near-api-js";
import type { AccountView } from "near-api-js/lib/providers/provider";
import type { Account } from "../interfaces";

import { useWalletSelector } from "../contexts/WalletSelectorContext";
const SignIn = () => {
  const { selector, modal, accounts, accountId } = useWalletSelector();
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<Account | null>(null);

  const getAccount = useCallback(async (): Promise<Account | null> => {
    if (!accountId) {
      return null;
    }

    const { network } = selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    return provider
      .query<AccountView>({
        request_type: "view_account",
        finality: "final",
        account_id: accountId,
      })
      .then((data) => ({
        ...data,
        account_id: accountId,
      }));
  }, [accountId, selector.options]);

  const handleSignIn = () => {
    modal.show();
  };

  const handleSignOut = async () => {
    const wallet = await selector.wallet();

    wallet.signOut().catch((err) => {
      console.log("Failed to sign out");
      console.error(err);
    });
  };

  const handleSwitchWallet = () => {
    modal.show();
  };

  useEffect(() => {
    if (!accountId) {
      return setAccount(null);
    }

    setLoading(true);

    // return void in this promise to avoid React warning
    getAccount()
      .then((nextAccount) => {
        setAccount(nextAccount);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Failed to get account");
        console.error(err);
        setLoading(false);
      });
  }, [accountId, getAccount]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {account && (
        <div>
          <div>Account ID: {account.account_id}</div>
          <div>Balance: {account.amount}</div>
        </div>
      )}
      <button
        className="mt-4 text-white"
        onClick={() => {
          void handleSignIn();
        }}
      >
        Connect Wallet
      </button>
      <button
        className="mt-4 text-white"
        onClick={() => {
          void handleSignOut();
        }}
      >
        Sign Out
      </button>
      <button
        className="mt-4 text-white"
        onClick={() => {
          void handleSwitchWallet();
        }}
      >
        Switch Wallet
      </button>
    </div>
  );
};

export default SignIn;
