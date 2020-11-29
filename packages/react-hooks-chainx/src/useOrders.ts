
import { useEffect, useState } from 'react';
import axios from 'axios';

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

type HistoryOrder = NowOrder;

interface Orders {
  NowOrders: NowOrder[];
  HistoryOrders: HistoryOrder[];
}

export default function useOrders(nodeName = ''): Orders {
  const [state, setState] = useState<Orders>({
    NowOrders: [],
    HistoryOrders: []
  });

  useEffect((): void => {
    async function fetchOrders(): Promise<void> {
      if (nodeName === '') {
        return;
      }

      const res = await axios.get(
        `https://api-v2.chainx.org/accounts/${nodeName}/open_orders?page=0&page_size=10`
      );

      setState({
        NowOrders: res.data.items.filter(
          (item: NowOrder) => item.remaining / Number(item.props.amount) < 1
        ),
        HistoryOrders: res.data.items.filter(
          (item: HistoryOrder) =>
            item.remaining / Number(item.props.amount) === 1
        )
      });
    }

    fetchOrders();
  }, [state, nodeName]);

  return state;
}
