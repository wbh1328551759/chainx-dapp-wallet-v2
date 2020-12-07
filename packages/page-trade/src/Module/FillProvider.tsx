import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';
import useAsksBids from '@polkadot/react-hooks-chainx/useAsksBids';
import useOrders from '@polkadot/react-hooks-chainx/useOrders';
import React, { createContext, FC, useContext } from 'react';
import useFills from '../hooks/useFills';

interface Ask {
  '_id': string,
  'pairId': number,
  'price': number,
  'amount': number,
  'isAsk': boolean
}

type Bid = Ask

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

export interface FillContextData {
  fills:  Fill[],
  Asks: Ask[],
  Bids: Bid[],
  NowOrders: NowOrder[],
  HistoryOrders: HistoryOrder[],
}

export const FillContext = createContext<FillContextData>({} as FillContextData);

export const FillProvider: FC = ({ children }) => {
  const Orders = useAsksBids();
  const Asks = Orders.Asks
  const Bids = Orders.Bids
  const fills = useFills()
  const { currentAccount } = useContext(AccountContext);
  const  OrderList  = useOrders(currentAccount);
  const  NowOrders = OrderList.NowOrders
  const  HistoryOrders = OrderList.HistoryOrders

  return (
    <FillContext.Provider value={{
        fills,
        Asks,
        Bids,
        NowOrders,
        HistoryOrders
    }} >
      {children}
    </FillContext.Provider>
  );
};
