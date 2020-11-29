
import React from 'react';
import TitledCard from '../../components/TitledCard';

import Asks from './Asks';
import Price from './Price';
import Bids from './Bids';
import Head from './Head';

export default function (): React.ReactElement {
  return (
    <TitledCard style={{ height: 590, paddingBottom: 0 }}>
      <header>Open Orders</header>
      <Head />
      <Asks />
      <Price />
      <Bids />
    </TitledCard>
  );
}
