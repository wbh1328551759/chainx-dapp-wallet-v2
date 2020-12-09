import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';
import useOrders from '@polkadot/react-hooks-chainx/useOrders';
import React, {createContext, FC, useContext} from 'react';


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

interface HistoryOrder {
  tradingHistoryIdx: number;
  turnover: number;
  price: number;
  pairId: number;
  blockTime: number;
}

export interface OrderContextData {
  NowOrders: NowOrder[];
  HistoryOrders: HistoryOrder[];
}

export const OrderContext = createContext<OrderContextData>({} as OrderContextData);

export const OrderProvider: FC = ({children}) => {
  const {currentAccount} = useContext(AccountContext);
  const Orders = useOrders(currentAccount);
  const NowOrders = Orders.NowOrders;
  const HistoryOrders = Orders.HistoryOrders;

  return (
    <OrderContext.Provider value={{
      NowOrders,
      HistoryOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
};
