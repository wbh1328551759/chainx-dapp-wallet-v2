
import React from 'react';
import { Table, TableHead, TableRow } from '@chainx/ui';
import { HeadCell } from '../Wrapper';
import { useTranslation } from '../../translate';

export default function (): React.ReactElement {
  const { t } = useTranslation();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <HeadCell style={{ width: '18%' }}>{t('Date')}</HeadCell>
          <HeadCell style={{ width: '11%' }}>{t('Number')}</HeadCell>
          <HeadCell style={{ width: '16%' }}>{t('Pair')}</HeadCell>
          <HeadCell style={{ width: '17%' }}>
            {t('Order Price')}
          </HeadCell>
          <HeadCell style={{ width: '19%' }}>
            {t('Order Amount')}
          </HeadCell>
          {/*<HeadCell style={{ width: '16%' }}>*/}
          {/*  {t('Freeze Amount')}*/}
          {/*</HeadCell>*/}
          {/*<HeadCell style={{ width: '16%' }}>*/}
          {/*  {t('Filled / Percentage %')}*/}
          {/*</HeadCell>*/}
          <HeadCell style={{ textAlign: 'right' }}>
            {t('Operation')}
          </HeadCell>
        </TableRow>
      </TableHead>
    </Table>
  );
}
