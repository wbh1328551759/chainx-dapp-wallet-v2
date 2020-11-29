
import React from 'react';
import { Table, TableHead, TableRow } from '@chainx/ui';
import { HeadCell } from '../Wrapper';
import { useTranslation } from '../../translate';

export default function () {
  const { t } = useTranslation();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <HeadCell style={{ width: '12%' }}>{t('Date')}</HeadCell>
          <HeadCell style={{ width: '5%' }}>{t('Number')}</HeadCell>
          <HeadCell style={{ width: '8%' }}>{t('Pair')}</HeadCell>
          <HeadCell style={{ width: '11%' }}>
            {t('Order Price')}
          </HeadCell>
          <HeadCell style={{ width: '14%' }}>
            {t('Order Amount')}
          </HeadCell>
          <HeadCell style={{ width: '15%' }}>
            {t('Filled / Percentage %')}
          </HeadCell>
          <HeadCell style={{ width: '11%' }}>
            {t('Avg Price')}
          </HeadCell>
          <HeadCell style={{ width: '15%' }}>
            {t('All Volume')}
          </HeadCell>
          <HeadCell style={{ textAlign: 'right' }}>
            {t('Status')}
          </HeadCell>
        </TableRow>
      </TableHead>
    </Table>
  );
}
