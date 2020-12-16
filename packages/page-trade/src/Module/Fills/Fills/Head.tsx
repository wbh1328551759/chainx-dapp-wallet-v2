
import React from 'react';
// import { Table, TableHead, TableRow } from '@chainx/ui';
import { HeadTitle } from '../../components/HeadCell';
import { useTranslation } from '../../../translate';
import { Table } from '@polkadot/react-components';

export default function (): React.ReactElement {
  const { t } = useTranslation();

  return (
    <Table className="marbot">
      {/* <TableHead> */}
        <tr>
          <HeadTitle>{t('Price')}</HeadTitle>
          <HeadTitle>{t('Quantity')}</HeadTitle>
          <HeadTitle>{t('Date')}</HeadTitle>
        </tr>
      {/* </TableHead> */}
    </Table>
  );
}
