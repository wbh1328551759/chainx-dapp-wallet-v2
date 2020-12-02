
import { useApi } from '@polkadot/react-hooks';
import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';

export default function usePcxFree(address = '',n = 0): PcxFree {
  const { api } = useApi();
  const [state, setState] = useState<object>({});
  const { currentAccount } = useContext(AccountContext);

  useEffect((): void => {
    async function fetchPcxFree() {
      if (address === '') {
        return;
      }
      const { data: balance } = await api.query.system.account(address);
      setState(balance);
    }

    fetchPcxFree();
  }, [currentAccount,n]);

  return <PcxFree>state;
}
