
import React from 'react';
// import { Table, TableHead, TableRow } from '@chainx/ui';
// import { HeadCell } from '../Wrapper';
import { useTranslation } from '../../translate';
import { Table } from '@polkadot/react-components';
import { HeadTitles } from '../../Module/components/HeadCell';

export default function () {
  const { t } = useTranslation();

  return (
    <Table className="marbot">
      {/* <TableHead> */}
      <tr>
          <HeadTitles style={{width: '19%'}}>{t('Date')}</HeadTitles>
          <HeadTitles style={{width: '12%'}}>{t('Number')}</HeadTitles>
          <HeadTitles style={{width: '15%'}}>{t('Pair')}</HeadTitles>
          <HeadTitles style={{width: '18%'}}>
            {t('Order Price')}
          </HeadTitles>
          <HeadTitles style={{width: '21%'}}>
            {t('Order Amount')}
          </HeadTitles>
          {/*<HeadTitles style={{ width: '15%' }}>*/}
          {/*  {t('Filled / Percentage %')}*/}
          {/*</HeadTitles>*/}
          {/*<HeadTitles style={{ width: '11%' }}>*/}
          {/*  {t('Avg Price')}*/}
          {/*</HeadTitles>*/}
          {/*<HeadTitles style={{ width: '15%' }}>*/}
          {/*  {t('All Volume')}*/}
          {/*</HeadTitles>*/}
          <HeadTitles style={{textAlign: 'right'}}>
            {t('Status')}
          </HeadTitles>
        </tr>
      {/* </TableHead> */}
    </Table>
  );
}
