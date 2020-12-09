
import React from 'react';
import AskBid from './AskBid';
import MainContent from './MainContent';
import Fills from './Fills';
import Wrapper from './Wrapper';

export default function ({ nodeName, setNodeName }: NodeNameProps): React.ReactElement<NodeNameProps> {

  return (
      <Wrapper>
        <AskBid />
        <MainContent nodeName={nodeName}
          setNodeName={setNodeName} />
        <Fills />
      </Wrapper>
  );
}
