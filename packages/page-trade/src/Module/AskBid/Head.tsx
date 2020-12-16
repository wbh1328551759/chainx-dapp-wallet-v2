
// import { Table, TableHead, TableRow } from '@chainx/ui';
import React from 'react';
import { HeadTitle } from '../components/HeadCell';
import { useTranslation } from '../../translate';
import { Table } from '@polkadot/react-components';



export default function (): React.ReactElement {
  const { t } = useTranslation();

  return (
    <Table>
      <tr>
        <HeadTitle>{t('Price')}</HeadTitle>
        <HeadTitle style={{ textAlign: 'left' }}>{t('Quantity')}</HeadTitle>
          {/* <HeadCell style={{ textAlign: 'right', width: '40%' }}>累计</HeadCell> */}
      </tr>
    </Table>
  );
}
