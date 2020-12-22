
// import { Table, TableBody, TableRow } from '@chainx/ui';
import { toPrecision } from '../../../components/toPrecision';
import moment from 'moment';
import { PriceAriseCell, PriceDownCell } from '../../components/PriceCell';
import AmountCell from '../../components/AmountCell';
import TimeCell from './TimeCell';
import React, { useContext } from 'react';
import styled from 'styled-components';
import {DexContext} from '@polkadot/react-components-chainx/DexProvider';
import BigNumber from 'bignumber.js';
import Empty from '../../../components/Empty';
import { useTranslation } from '../../../translate';

const Wrapper = styled.div`
  height: 360px;
  overflow-y: auto;
  tr{
    height: 24px;
  }
  table {
    width: 100%;
    height: 100%;
  }
`;

export default function (): React.ReactElement {
  const { fills } = useContext(DexContext);
  const { t } = useTranslation();
  return (
    <Wrapper>
      <table>
        <tbody>
          {
            fills.length <= 0 && (
              <tr>
                <td>
                  <Empty text={t('No deal')} />
                </td>
              </tr>  
            )
          }
        {/* <TableBody> */}
          {fills.map((fill, index) => {
            const price = Number(
              toPrecision(fill.price, 9)
            ).toFixed(7);
            const m = moment(fill.blockTime);
            const time = m.format('HH:mm:ss');
            const fullTime = m.format('HH:mm:ss');
            const bgAmount = new BigNumber(fill.turnover)
            const amount = bgAmount.toNumber() / 10
            return (
              
              <tr key={index}>
                {fill.arise ? (
                  <PriceAriseCell style={{ fontSize: 12, width: '30%' }}>
                    {price}
                  </PriceAriseCell>
                ) : (
                    <PriceDownCell style={{ fontSize: 12, width: '30%' }}>
                      {price}
                    </PriceDownCell>
                  )}
                <AmountCell
                  precision={7}
                  style={{ width: '42%' }}
                  value={amount}
                />
                <TimeCell style={{ width: '28%' }}
                  title={fullTime}>
                  {time}
                </TimeCell>
              </tr>
            );
          })}
        {/* </TableBody> */}
        </tbody>
      </table>
    </Wrapper>
  );
}
