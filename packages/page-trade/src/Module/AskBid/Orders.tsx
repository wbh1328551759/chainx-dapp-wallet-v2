
import React from 'react';

import { Table, TableBody, TableRow } from '@chainx/ui';
import {
  OrderAmountCell,
  OrderPriceCell,
  TableWrapper
} from './Wrapper';
import { toPrecision } from '../../components/toPrecision';

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
            const price = Number(toPrecision(order.price, 9)).toFixed(
              7
            );

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
                  precision={8}
                  value={order.amount}
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
