
import React from 'react';
import Orders from './Orders';
import useAsksBids from '@polkadot/react-hooks-chainx/useAsksBids';

export default function (): React.ReactElement {
  const { Bids } = useAsksBids();

  return <Orders isAsk={false}
    orders={Bids} />;
}
