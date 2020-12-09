
import React, { useContext } from 'react';
import Orders from './Orders';
import {DexContext} from '@polkadot/react-components-chainx/DexProvider';

export default function (): React.ReactElement {
  const { Bids } = useContext(DexContext);

  return <Orders isAsk={false}
    orders={Bids} />;
}
