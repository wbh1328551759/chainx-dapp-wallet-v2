import React, {useContext} from 'react';
import TableHead from './Head';
import Content from './Content';
import Empty from '../../components/Empty';
import {useTranslation} from '../../translate';
import {DexContext} from '@polkadot/react-components-chainx/DexProvider';
import {Spinner} from '@polkadot/react-components';

export default function (): React.ReactElement {
  const {NowOrders} = useContext(DexContext);
  const {t} = useTranslation();
  const {isLoading} = useContext(DexContext);

  return (
    <>
      <TableHead/>
      {isLoading ?<Spinner/> :NowOrders && NowOrders.length > 0 ? (
        <Content/>
      ) : (
        <Empty style={{marginTop: 30, marginBottom: 30}}
               text={t('No Order')}/>
      )}
    </>
  );
}
