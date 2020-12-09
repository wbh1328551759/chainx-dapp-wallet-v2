
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useApi} from '@polkadot/react-hooks';

interface OrderProps {
  id: number;
  side: string;
  price: number;
  amount: string;
  pairId: number;
  submitter: string;
  orderType: string;
  createdAt: number;
}
interface NowOrder {
  _id: number;
  blockHeight: number;
  blockHash: string;
  props: OrderProps;
  status: string;
  remaining: number;
  executedIndices: [];
  alreadyFilled: number;
  lastUpdateAt: number;
}

interface HistoryOrder{
  tradingHistoryIdx: number;
  turnover: number;
  price: number;
  pairId: number;
  blockTime: number;
}

interface Orders {
  NowOrders: NowOrder[];
  HistoryOrders: HistoryOrder[];
}

export default function useOrders(currentAccount = ''): Orders {
  const api = useApi();
  const [state, setState] = useState<Orders>({
    NowOrders: [],
    HistoryOrders: []
  });

  useEffect((): void => {
    async function fetchOrders(): Promise<void> {
      const testOrMain = await api.api.rpc.system.properties();
      const testOrMainNum = JSON.parse(testOrMain);
      let nowOrdersList: any;
      let historyOrdersList: any;
      if (testOrMainNum.ss58Format === 42) {
        nowOrdersList = await axios.get(`https://testnet-api.chainx.org/accounts/${currentAccount}/open_orders?page=0&page_size=10`);
        historyOrdersList = await axios.get(`https://testnet-api.chainx.org/accounts/${currentAccount}/deals?page=0&page_size=10`)
      } else {
        nowOrdersList = await axios.get(`https://api-v2.chainx.org/accounts/${currentAccount}/open_orders?page=0&page_size=10`);
        historyOrdersList = await axios.get(`https://api-v2.chainx.org/accounts/${currentAccount}/deals?page=0&page_size=10`)
      }
      setState({
        NowOrders: nowOrdersList.data.items,
        HistoryOrders: historyOrdersList.data.items
      });
    }
    fetchOrders()
  }, [currentAccount]);

  return state;
}
