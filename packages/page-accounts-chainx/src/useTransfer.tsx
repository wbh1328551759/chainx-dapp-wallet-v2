
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Transfer {
  id: number,
  sendName: string,
  receiveName: string,
  hashAdd: string,
  price: number,
  createdAt: number
}


export default function useTransfer(currentAccount = ''): Transfer[] {
  const [state, setState] = useState<Transfer[]>([]);

  useEffect((): void => {
    async function fetchTransfers() {
      if (currentAccount === '') {
        return;
      }
      let res = await axios.get(`https://api-v2.chainx.org/accounts/${currentAccount}/transfers?page=0&page_size=10`);
      // let res = await axios.get(`https://api-v2.chainx.org/accounts/5Escb2u24DLhTSJBkStrfQjQcdDe9XaP4wsa3EA9BGAhk8mu/transfers?page=0&page_size=10`);

      setState(res.data.items);
    }

    fetchTransfers();
  }, [currentAccount]);
  console.log()
  return state;
}
