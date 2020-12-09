
import React, { useContext } from 'react';
import TableHead from './Head';
import Content from './Content';
import Empty from '../../components/Empty';
import { useTranslation } from '../../translate';
import {DexContext} from '@polkadot/react-components-chainx/DexProvider';

export default function ({ nodeName }: NodeNameProps): React.ReactElement<NodeNameProps> {
  const {  NowOrders } = useContext(DexContext);
  const { t } = useTranslation();

  return (
    <>
      <TableHead />
      {NowOrders && NowOrders.length > 0 ? (
        <Content nodeName={nodeName} />
      ) : (
          <Empty style={{ marginTop: 30, marginBottom: 30 }}
            text={t('No Order')} />
        )}
    </>
  );
}
