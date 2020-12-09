
import { Table, TableBody, TableRow } from '@chainx/ui';
import { toPrecision } from '../../../components/toPrecision';
import moment from 'moment';
import { PriceAriseCell, PriceDownCell } from '../../components/PriceCell';
import AmountCell from '../../components/AmountCell';
import TimeCell from './TimeCell';
import React, { useContext } from 'react';
import styled from 'styled-components';
import {DexContext} from '@polkadot/react-components-chainx/DexProvider';

const Wrapper = styled.div`
  height: 360px;
  overflow-y: auto;
  tr{
    height: 24px;
  }
`;

export default function (): React.ReactElement {
  const { fills } = useContext(DexContext);
  return (
    <Wrapper>
      <Table>
        <TableBody>
          {fills.map((fill, index) => {
            const price = Number(
              toPrecision(fill.price, 9)
            ).toFixed(7);
            const m = moment(fill.blockTime);
            const time = m.format('HH:mm:ss');
            const fullTime = m.format('HH:mm:ss');

            return (
              <TableRow key={index}>
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
                  precision={8}
                  style={{ width: '42%' }}
                  value={fill.turnover}
                />
                <TimeCell style={{ width: '28%' }}
                  title={fullTime}>
                  {time}
                </TimeCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Wrapper>
  );
}
