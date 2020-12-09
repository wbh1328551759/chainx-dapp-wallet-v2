
import React, { useContext } from 'react';
import TitledCard from '../../../components/TitledCard';
import Head from './Head';
import Body from './Body';
import Empty from '../../../components/Empty';
import { useTranslation } from '../../../translate';
import {DexContext} from '@polkadot/react-components-chainx/DexProvider';


export default function () {
  const { fills } = useContext(DexContext);
  const { t } = useTranslation();

  return (
    <TitledCard style={{ marginTop: 16 }}>
      <header>Latest</header>
      <Head />
      <Body />
      {fills.length <= 0 && <Empty style={{ marginTop: 30 }}
        text={t('No deal')} />}
    </TitledCard>
  );
}
