
import React from 'react';

import { Table, TableBody, TableRow } from '@chainx/ui';
import {
  OrderAmountCell,
  OrderPriceCell,
  TableWrapper
} from './Wrapper';
import { toPrecision } from '../../components/toPrecision';
import BigNumber from 'bignumber.js';

interface Props {
  orders: any[],
  isAsk: boolean
}

export default function ({ isAsk, orders }: Props): React.ReactElement<Props> {
  return (
    <TableWrapper
      style={{ flexDirection: isAsk ? 'column-reverse' : 'column' }}
    >
      <Table>
        <TableBody>
          {orders.map((order, index) => {
            const bgPrice = new BigNumber(toPrecision(order[0], 9))
            const price = bgPrice.toNumber().toFixed(
              7
            );
            const bgAmount = new BigNumber(order[1])
            const amount = bgAmount.toNumber() / 10

            return (
              <TableRow key={index}>
                {/* 价格 */}
                <OrderPriceCell
                  height={24}
                  onClick={() =>
                    console.log('order:' + order)
                  }
                >
                  {price}
                </OrderPriceCell>
                {/* 数量 */}
                <OrderAmountCell
                  height={24}
                  precision={7}
                  value={amount}
                />
                {/* 累计 */}
                {/* <SumCell height={24} > */}
                {/*  order 200 */}
                {/* </SumCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}
