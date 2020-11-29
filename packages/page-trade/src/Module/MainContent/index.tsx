
import React from 'react';
import Wrapper from './Wrapper';
import Kline from './kline';
import TradeForm from './TradeForm';

export default function ({ nodeName, setNodeName }: NodeNameProps): React.ReactElement<NodeNameProps> {
  return (
    <Wrapper className='content'>
      <Kline />
      <TradeForm nodeName={nodeName}
        setNodeName={setNodeName} />
    </Wrapper>
  );
}
