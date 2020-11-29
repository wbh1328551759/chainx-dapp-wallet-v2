
import { Table, TableHead, TableRow } from '@chainx/ui';
import React from 'react';
import HeadCell from '../components/HeadCell';
import { useTranslation } from '../../translate';

export default function (): React.ReactElement {
  const { t } = useTranslation();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <HeadCell style={{ width: '30%' }}>{t('Price')}</HeadCell>
          <HeadCell style={{ width: '30%' }}>{t('Quantity')}</HeadCell>
          {/* <HeadCell style={{ textAlign: 'right', width: '40%' }}>累计</HeadCell> */}
        </TableRow>
      </TableHead>
    </Table>
  );
}
