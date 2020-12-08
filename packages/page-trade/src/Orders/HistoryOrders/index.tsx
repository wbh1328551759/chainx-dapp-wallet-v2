
import React, { useContext } from 'react';
import TableHead from './Head';
import Content from './Content';
import Empty from '../../components/Empty';
import useOrders from '@polkadot/react-hooks-chainx/useOrders';
import { useTranslation } from '../../translate';
import { OrderContext } from '../OrderProvider';

export default function ({ nodeName }: NodeNameProps): React.ReactElement<NodeNameProps> {
  // const { HistoryOrders } = useOrders(nodeName);
  const {  HistoryOrders } = useContext(OrderContext);
  const { t } = useTranslation();

  return (
    <>
      {HistoryOrders.length > 0 ? (
        <>
          <Content nodeName={nodeName} />
        </>
      ) : (
          <>
            <TableHead />
            <Empty
              style={{ marginTop: 30, marginBottom: 30 }}
              text={t('No History Order')}
            />
          </>
        )}
    </>
  );
}
