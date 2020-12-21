
import { useApi } from '@polkadot/react-hooks';
import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';
import {useLocalStorage} from '@polkadot/react-hooks-chainx/index';

export default function usePcxFree(address = '',n = 0): PcxFreeInfo {
  const { api, isApiReady } = useApi();
  const [, setValue] = useLocalStorage('pcxFreeInfo')
  const defaultPcxFreeValue = JSON.parse(window.localStorage.getItem('pcxFreeInfo'))
  const [state, setState] = useState<PcxFreeInfo>({
    feeFrozen: defaultPcxFreeValue.feeFrozen,
    free: defaultPcxFreeValue.free,
    miscFrozen: defaultPcxFreeValue.miscFrozen,
    reserved: defaultPcxFreeValue.reserved,
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

  return <PcxFreeInfo>state;
}
