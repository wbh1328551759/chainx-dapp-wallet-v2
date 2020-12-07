
import React, { useContext } from 'react';
import { FillContext } from '../FillProvider';
import Orders from './Orders';
// import useAsksBids from '@polkadot/react-hooks-chainx/useAsksBids';

export default function (): React.ReactElement {
  // const { Bids } = useAsksBids();
  const { Bids } = useContext(FillContext);

  return <Orders isAsk={false}
    orders={Bids} />;
}
