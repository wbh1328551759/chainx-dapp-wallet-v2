import {useEffect, useState} from 'react';
import axios from 'axios';
import {useApi} from '@polkadot/react-hooks';

interface Deposit {
  id: number,
  sendName: string,
  receiveName: string,
  hashAdd: string,
  price: number,
  createdAt: number
}


export default function useDeposit(currentAccount = ''): Deposit[] {
  const api = useApi();
  const [state, setState] = useState<Deposit[]>([]);
  let depositTimeId: any = '';

  async function fetchDeposits(currentAccount: string) {
    const testOrMain = await api.api.rpc.system.properties();
    const testOrMainNum = JSON.parse(testOrMain);
    let res: any;
    if (testOrMainNum.ss58Format === 42) {
      res = await axios.get(`http://8.210.38.126:3214/accounts/${currentAccount}/deposits?page=0&page_size=20`);
    } else {
      res = await axios.get(`https://api-v2.chainx.org/accounts/${currentAccount}/deposits?page=0&page_size=20`);
    }
    setState(res.data.items);
  }

  useEffect((): void => {
    fetchDeposits(currentAccount);
  }, []);

  useEffect(() => {
    depositTimeId = setInterval(() => {
      fetchDeposits(currentAccount);
    }, 5000);

    return () => window.clearInterval(depositTimeId);
  }, [currentAccount, depositTimeId]);

  return state;
}
