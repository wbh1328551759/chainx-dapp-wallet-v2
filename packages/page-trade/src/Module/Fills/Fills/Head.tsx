
import React from 'react';
import { Table, TableHead, TableRow } from '@chainx/ui';
import HeadCell from '../../components/HeadCell';
import { useTranslation } from '../../../translate';

export default function (): React.ReactElement {
  const { t } = useTranslation();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <HeadCell style={{ width: '30%' }}>{t('Price')}</HeadCell>
          <HeadCell style={{ width: '42%' }}>{t('Quantity')}</HeadCell>
          <HeadCell style={{ textAlign: 'right', width: '28%' }}>
            {t('Date')}
          </HeadCell>
        </TableRow>
      </TableHead>
    </Table>
  );
}
