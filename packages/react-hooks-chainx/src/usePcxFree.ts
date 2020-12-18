
import { useApi } from '@polkadot/react-hooks';
import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';
import {useLocalStorage} from '@polkadot/react-hooks-chainx/index';

export interface PcxFreeInfo{
  feeFrozen: number;
  free: number;
  miscFrozen: number;
  reserved: number;
}

export default function usePcxFree(address = '',n = 0): PcxFree {
  const { api, isApiReady } = useApi();
  const [, setValue] = useLocalStorage('pcxFreeInfo')
  const [state, setState] = useState<PcxFreeInfo>({
    feeFrozen: 0,
    free: 0,
    miscFrozen: 0,
    reserved: 0,
  });
  const { currentAccount } = useContext(AccountContext);

  useEffect((): void => {
    async function fetchPcxFree() {
      if (address === '') {
        return;
      }
      const { data: balance } = await api.query.system.account(address);
      setValue(balance)
      setState(balance);
    }

    fetchPcxFree();
  }, [currentAccount, n, isApiReady]);

  return <PcxFree>state;
}
