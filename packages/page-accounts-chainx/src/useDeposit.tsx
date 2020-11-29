
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Deposit {
  id: number,
  sendName: string,
  receiveName: string,
  hashAdd: string,
  price: number,
  createdAt: number
}


export default function useDeposit(currentAccount = ''): Deposit[] {
  const [state, setState] = useState<Deposit[]>([]);

  useEffect((): void => {
    async function fetchDeposits() {
      if (currentAccount === '') {
        return;
      }

      const res = await axios.get(`https://api-v2.chainx.org/accounts/${currentAccount}/deposits?page=0&page_size=20`);
      setState(res.data.items)

    }

    fetchDeposits();
  }, [currentAccount]);

  return state;
}
