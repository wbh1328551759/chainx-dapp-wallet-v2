import {useEffect, useState} from 'react';
import axios from 'axios';
import {useApi} from '@polkadot/react-hooks';
import {AssetsInfo} from '@polkadot/react-hooks-chainx/types';

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
  const api = useApi();
  const [state, setState] = useState<OpenOders>({Asks: [], Bids: []});
  let askBidTimeId: any = '';
  async function fetchAskBid() {
    const testOrMain = await api.api.rpc.system.properties();
    const testOrMainNum = JSON.parse(testOrMain);
    let res;
    if (testOrMainNum.ss58Format === 42) {
      res = await axios.get('http://8.210.38.126:3214/dex/depth/0?cnt=6');
    } else {
      res = await axios.get('https://api-v2.chainx.org/dex/depth/0');
    }
    setState({
      Asks: res.data.asks.filter((ask: Ask) => ask.amount !== 0),
      Bids: res.data.bids.filter((bid: Bid) => bid.amount !== 0)
    });
  }

  useEffect(() => {
    fetchAskBid()
  },[])

  useEffect(() => {
    askBidTimeId = setInterval(() => {
      fetchAskBid();
    }, 5000);
    return () => window.clearInterval(askBidTimeId);
  }, [askBidTimeId]);

  return state;
}
