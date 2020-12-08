
import Wrapper from './Wrapper';
import React, { useState } from 'react';
import Header from './Header';
import UserOrders from './UserOrders';
import HistoryOrders from './HistoryOrders';
import { OrderProvider } from './OrderProvider';

export default function ({ nodeName }: NodeNameProps): React.ReactElement<NodeNameProps> {
  const [idx, setIdx] = useState(0);

  return (
    <OrderProvider>
      <Wrapper>
        <Header idx={idx}
          setIdx={setIdx} />
        {idx === 0 ? <UserOrders nodeName={nodeName} /> : <HistoryOrders nodeName={nodeName} />}
      </Wrapper>
    </OrderProvider>
  );
}
