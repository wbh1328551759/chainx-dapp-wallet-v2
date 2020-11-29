
import { useApi } from '@polkadot/react-hooks';
import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';

export default function usePcxFree(address = ''): PcxFree {
  const { api } = useApi();
  const [state, setState] = useState<object>({});
  const { currentAccount } = useContext(AccountContext);

  useEffect((): void => {
    async function fetch() {
      if (address === '') {
        return;
      }
      const { data: balance } = await api.query.system.account(address);
      setState(balance);
    }

    fetch();
  }, [currentAccount]);

  return <PcxFree>state;
}
