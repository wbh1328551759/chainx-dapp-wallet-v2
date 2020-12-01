
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useApi} from '@polkadot/react-hooks';

export default function useFills(): Fill[] {
  const api = useApi();
  const [state, setState] = useState<Fill[]>([]);
  let fillTimeId: any = '';

  useEffect((): void => {
    async function fetchFills() {
      const testOrMain = await api.api.rpc.system.properties();
      const testOrMainNum = JSON.parse(testOrMain);
      let res;
      if (testOrMainNum.ss58Format === 42) {
        res = await axios.get('http://8.210.38.126:3214/dex/fills/0');
        console.log('1')
      } else {
        res = await axios.get('https://api-v2.chainx.org/dex/fills/0');
      }
      setState([
        ...res.data.items
      ]);
    }

    fillTimeId = setInterval(() => {
      fetchFills();
    }, 5000);
    }, [fillTimeId]);

  return state;
}
