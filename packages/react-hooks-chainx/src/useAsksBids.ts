import {useEffect, useState} from 'react';
import {useApi} from '@polkadot/react-hooks';

interface Ask {
  '_id': string,
  'pairId': number,
  'price': number,
  'amount': number,
  'isAsk': boolean
}

interface Bid extends Ask{}

interface OpenOrders {
  Asks: Ask[];
  Bids: Bid[];
}

export default function useAsksBids(isLoading: boolean): OpenOrders {
  const api = useApi();
  const [state, setState] = useState<OpenOrders>({Asks: [], Bids: []});
  let askBidTimeId: any = '';
  async function fetchAskBid() {
    // const testOrMain = await api.api.rpc.system.properties();
    // const testOrMainNum = JSON.parse(testOrMain);
    // let res;
    // if (testOrMainNum.ss58Format === 42) {
    //   res = await axios.get('https://testnet-api.chainx.org/dex/depth/0?cnt=6');
    // } else {
    //   res = await axios.get('https://api-v2.chainx.org/dex/depth/0');
    // }
    const res = await api.api.rpc.xspot.getDepth(0,10)
    const askAndBidList = JSON.parse(JSON.stringify(res))

    setState({
      Asks: askAndBidList.asks.filter((ask: Ask) => ask.amount !== 0),
      Bids: askAndBidList.bids.filter((bid: Bid) => bid.amount !== 0)
    });
  }

  useEffect(() => {
    window.clearInterval(askBidTimeId)
    fetchAskBid()
  },[isLoading])

  useEffect(() => {
    askBidTimeId = setInterval(() => {
      fetchAskBid();
    }, 5000);
    return () => window.clearInterval(askBidTimeId);
  }, [askBidTimeId]);

  return state;
}
