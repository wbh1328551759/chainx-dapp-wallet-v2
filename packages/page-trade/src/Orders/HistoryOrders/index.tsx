
import React, { useContext } from 'react';
import TableHead from './Head';
import Content from './Content';
import Empty from '../../components/Empty';
import { useTranslation } from '../../translate';
import {DexContext} from '@polkadot/react-components-chainx/DexProvider';

export default function (): React.ReactElement {
  const { HistoryOrders } = useContext(DexContext);
  const { t } = useTranslation();

  return (
    <>
      <TableHead />
      {HistoryOrders.length > 0 ? (
        <>
          <Content />
        </>
      ) : (
          <>
            <Empty
              style={{ marginTop: 30, marginBottom: 30 }}
              text={t('No History Order')}
            />
          </>
        )}
    </>
  );
}
