
import React from 'react';
import AskBid from './AskBid';
import MainContent from './MainContent';
import Fills from './Fills';
import Wrapper from './Wrapper';
import { FillProvider } from './FillProvider';

export default function ({ nodeName, setNodeName }: NodeNameProps): React.ReactElement<NodeNameProps> {

  return (
    <FillProvider>
      <Wrapper>
        <AskBid />
        <MainContent nodeName={nodeName}
          setNodeName={setNodeName} />
        <Fills />
      </Wrapper>
    </FillProvider>
  );
}
