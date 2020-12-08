import useAsksBids from '@polkadot/react-hooks-chainx/useAsksBids';
import React, { createContext, FC } from 'react';
import useFills from '../hooks/useFills';

interface Ask {
  '_id': string,
  'pairId': number,
  'price': number,
  'amount': number,
  'isAsk': boolean
}

type Bid = Ask


export interface FillContextData {
  fills:  Fill[],
  Asks: Ask[],
  Bids: Bid[],
}

export const FillContext = createContext<FillContextData>({} as FillContextData);

export const FillProvider: FC = ({ children }) => {
  const Orders = useAsksBids();
  const Asks = Orders.Asks
  const Bids = Orders.Bids
  const fills = useFills()

  return (
    <FillContext.Provider value={{
        fills,
        Asks,
        Bids
    }} >
      {children}
    </FillContext.Provider>
  );
};
