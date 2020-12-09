import useAsksBids from '@polkadot/react-hooks-chainx/useAsksBids';
import React, {createContext, FC, useContext} from 'react';
import useFills from '@polkadot/react-hooks-chainx/useFills';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';
import useOrders from '@polkadot/react-hooks-chainx/useOrders';

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
}

export const DexContext = createContext<DexContextData>({} as DexContextData);

export const DexProvider: FC = ({children}) => {
  const Orders = useAsksBids();
  const Asks = Orders.Asks;
  const Bids = Orders.Bids;
  const fills = useFills();
  const {currentAccount} = useContext(AccountContext);
  const OrderList = useOrders(currentAccount);
  const NowOrders = OrderList.NowOrders;
  const HistoryOrders = OrderList.HistoryOrders;

  return (
    <DexContext.Provider value={{
      fills,
      Asks,
      Bids,
      NowOrders,
      HistoryOrders
    }}>
      {children}
    </DexContext.Provider>
  );
};
