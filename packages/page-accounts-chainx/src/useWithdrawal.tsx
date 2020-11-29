
import { useEffect, useState } from 'react';

import axios from 'axios';

interface Withdrawal {
  id: number,
  sendName: string,
  receiveName: string,
  hashAdd: string,
  price: number,
  createdAt: number
}

export default function useWithdrawal(currentAccount = ''): Withdrawal[] {
  const [state, setState] = useState<Withdrawal[]>([]);
  useEffect((): void => {
    async function fetchWithdrawals() {
      if (currentAccount === '') {
        return;
      }
      const res = await axios.get(`https://api-v2.chainx.org/accounts/${currentAccount}/withdrawals?page=0&page_size=20`);
      setState(res.data.items);
    }

    fetchWithdrawals();
  }, [currentAccount]);

  return state;
}
