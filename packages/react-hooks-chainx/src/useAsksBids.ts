
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Ask {
  '_id': string,
  'pairId': number,
  'price': number,
  'amount': number,
  'isAsk': boolean
}

type Bid = Ask

interface OpenOders {
  Asks: Ask[];
  Bids: Bid[];
}

export default function useAsksBids(): OpenOders {
  // const [state, setState] = useState<Ask[]>([]);
  const [state, setState] = useState<OpenOders>({ Asks: [], Bids: [] });

  useEffect((): void => {
    async function fetch() {
      const res = await axios.get('https://api-v2.chainx.org/dex/depth/0');

      setState({
        Asks: res.data.asks.filter((ask: Ask) => ask.amount !== 0),
        Bids: res.data.bids.filter((bid: Bid) => bid.amount !== 0)
      });
    }

    fetch();
  }, [state]);

  return state;
}
