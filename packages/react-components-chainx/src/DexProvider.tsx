import useAsksBids from '@polkadot/react-hooks-chainx/useAsksBids';
import React, {createContext, FC, useContext, useEffect, useState} from 'react';
import useFills from '@polkadot/react-hooks-chainx/useFills';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';
import useOrders from '@polkadot/react-hooks-chainx/useOrders';
import {StatusContext} from '@polkadot/react-components';

interface Ask {
  '_id': string,
  'pairId': number,
  'price': number,
  'amount': number,
  'isAsk': boolean
}

interface Bid extends Ask {}

interface NowOrder {
  _id: number;
  blockHeight: number;
  blockHash: string;
  props: NowOrderProps;
  status: string;
  remaining: number;
  executedIndices: [];
  alreadyFilled: number;
  lastUpdateAt: number;
}

interface HistoryOrder {
  tradingHistoryIdx: number;
  turnover: number;
  price: number;
  pairId: number;
  blockTime: number;
}

interface NowOrderProps {
  id: number;
  side: string;
  price: number;
  amount: string;
  pairId: number;
  submitter: string;
  orderType: string;
  createdAt: number;
}

export interface DexContextData {
  fills: Fill[],
  Asks: Ask[],
  Bids: Bid[],
  NowOrders: NowOrder[];
  HistoryOrders: HistoryOrder[];
  isLoading: boolean;
  setLoading: React.Dispatch<boolean>
}

export const DexContext = createContext<DexContextData>({} as DexContextData);

export const DexProvider: FC = ({children}) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const {currentAccount} = useContext(AccountContext);
  const Orders = useAsksBids(isLoading);
  const fills = useFills(isLoading);
  const OrderList = useOrders(currentAccount, isLoading);
  const Asks = Orders.Asks;
  const Bids = Orders.Bids;
  const NowOrders = OrderList.NowOrders;
  const HistoryOrders = OrderList.HistoryOrders;

  useEffect(() => {
    setLoading(false)
  },[OrderList])

  return (
    <DexContext.Provider value={{
      fills,
      Asks,
      Bids,
      NowOrders,
      HistoryOrders,
      isLoading,
      setLoading
    }}>
      {children}
    </DexContext.Provider>
  );
};
