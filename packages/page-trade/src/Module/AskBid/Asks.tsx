
import React from 'react';
import Orders from './Orders';
import useAsksBids from '@polkadot/react-hooks/useAsksBids';

export default function (): React.ReactElement {
  const { Asks } = useAsksBids();

  return <Orders isAsk={true}
    orders={Asks} />;
}
