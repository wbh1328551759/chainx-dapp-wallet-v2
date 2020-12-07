
import React, { useContext } from 'react';
import { FillContext } from '../FillProvider';
import Orders from './Orders';
// import useAsksBids from '@polkadot/react-hooks-chainx/useAsksBids';

export default function (): React.ReactElement {
  // const { Asks } = useAsksBids();
  const { Asks } = useContext(FillContext);

  return <Orders isAsk={true}
    orders={Asks} />;
}
