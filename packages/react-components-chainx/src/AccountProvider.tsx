
import React, { createContext, FC, useState } from 'react';

import { useLocalStorage } from '@polkadot/react-hooks-chainx';

export interface AcccountContextData {
  currentAccount: string,
  changeAccount: (account: string) => void;
}

export const AccountContext = createContext<AcccountContextData>({} as AcccountContextData);

export const AccountProvider: FC = ({ children }) => {
  const [storedValue] = useLocalStorage<string>('currentAccount', '');
  const [currentAccount, setAccount] = useState<string>(storedValue);

  function changeAccount(account: string) {
    setAccount(account);
  }

  return (
    <AccountContext.Provider value={{
      currentAccount,
      changeAccount
    }} >
      {children}
    </AccountContext.Provider>
  );
};
