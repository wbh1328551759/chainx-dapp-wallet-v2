
import React from 'react';
// import { Table, TableHead, TableRow } from '@chainx/ui';
// import { HeadCell } from '../Wrapper';
import { useTranslation } from '../../translate';
import { Table } from '@polkadot/react-components';
import { HeadTitles } from '../../Module/components/HeadCell';

export default function (): React.ReactElement {
  const { t } = useTranslation();

  return (
    <Table className="marbot">
      {/* <TableHead> */}
        <tr>
          <HeadTitles style={{ width: '18%' }}>{t('BlockHeight')}</HeadTitles>
          <HeadTitles style={{ width: '11%' }}>{t('Number')}</HeadTitles>
          <HeadTitles style={{ width: '16%' }}>{t('Pair')}</HeadTitles>
          <HeadTitles style={{ width: '17%' }}>
            {t('Order Price')}
          </HeadTitles>
          <HeadTitles style={{ width: '19%' }}>
            {t('Order Amount')}
          </HeadTitles>
          {/*<HeadCell style={{ width: '16%' }}>*/}
          {/*  {t('Freeze Amount')}*/}
          {/*</HeadCell>*/}
          {/*<HeadCell style={{ width: '16%' }}>*/}
          {/*  {t('Filled / Percentage %')}*/}
          {/*</HeadCell>*/}
          <HeadTitles style={{ textAlign: 'right' }}>
            {t('Operation')}
          </HeadTitles>
        </tr>
      {/* </TableHead> */}
    </Table>
  );
}
