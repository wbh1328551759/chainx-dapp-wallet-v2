
import React, { useContext } from 'react';
import TableHead from './Head';
import Content from './Content';
import Empty from '../../components/Empty';
import useOrders from '@polkadot/react-hooks-chainx/useOrders';
import { useTranslation } from '../../translate';
import { FillContext } from '../../Module/FillProvider';

export default function ({ nodeName }: NodeNameProps): React.ReactElement<NodeNameProps> {
  const { NowOrders } = useOrders(nodeName);
  // const { NowOrders } = useContext(FillContext);
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
