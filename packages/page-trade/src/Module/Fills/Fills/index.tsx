
import React from 'react';
import TitledCard from '../../../components/TitledCard';
import Head from './Head';
import Body from './Body';



export default function () {

  return (
    <TitledCard style={{ marginTop: 16 }}>
      <header>Latest</header>
      <Head />
      <Body />
    </TitledCard>
  );
}
