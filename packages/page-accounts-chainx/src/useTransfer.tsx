import {useEffect, useState} from 'react';
import axios from 'axios';
import {useApi} from '@polkadot/react-hooks';

interface Transfer {
  id: number,
  sendName: string,
  receiveName: string,
  hashAdd: string,
  price: number,
  createdAt: number
}

export default function useTransfer(currentAccount = ''): Transfer[] {
  const api = useApi();
  const [state, setState] = useState<Transfer[]>([]);
  let transferTimeId: any = '';

  async function fetchTransfers(currentAccount: string) {
    const testOrMain = await api.api.rpc.system.properties();
    const testOrMainNum = JSON.parse(testOrMain);
    let res: any;
    if (testOrMainNum.ss58Format === 42) {
      res = await axios.get(`http://8.210.38.126:3214/accounts/${currentAccount}/transfers?page=0&page_size=20`);
     console.log('curreny')
      console.log(currentAccount)
      console.log('res')
      console.log(res)
    } else {
      res = await axios.get(`https://api-v2.chainx.org/accounts/${currentAccount}/transfers?page=0&page_size=10`);
      // let res = await axios.get(`https://api-v2.chainx.org/accounts/5Escb2u24DLhTSJBkStrfQjQcdDe9XaP4wsa3EA9BGAhk8mu/transfers?page=0&page_size=10`);
    }
    setState(res.data.items);
  }

  useEffect((): void => {
    fetchTransfers(currentAccount);
  }, []);

  useEffect(() => {
    transferTimeId = setInterval(() => {
      fetchTransfers(currentAccount);
    }, 5000);

    return () => window.clearInterval(transferTimeId);
  }, [currentAccount, transferTimeId]);

  return state;
}
