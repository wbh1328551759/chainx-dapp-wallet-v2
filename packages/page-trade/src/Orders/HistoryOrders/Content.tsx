
import React, { useContext } from 'react';
import { Table, TableBody, TableHead, TableRow } from '@chainx/ui';
import { toPrecision } from '../../components/toPrecision';
import {
  FillCell,
  IndexCell,
  NumberCell,
  PairCell,
  TimeCell
} from '../UserOrders/Wrapper';
import moment from 'moment';
import { HeadCell, StatCell } from '../Wrapper';
import useOrders from '@polkadot/react-hooks-chainx/useOrders';
import { useTranslation } from '../../translate';
import { FillContext } from '../../Module/FillProvider';

export default function ({ nodeName }: NodeNameProps): React.ReactElement<NodeNameProps> {
  const { HistoryOrders } = useOrders(nodeName);
  // const { HistoryOrders } = useContext(FillContext);
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

      <TableBody>
        {HistoryOrders.map((order, index) => {
          const currencyPair = [['PCX', 'BTC']];
          const amount = toPrecision(Number(order.props.amount), 8);
          const precision = 9;
          const unitPrecision = 1;
          const fillPercentage = Number(
            (order.remaining / Number(order.props.amount)) * 100
          ).toFixed(2);
          const showPrecision = precision - unitPrecision;
          const price = toPrecision(order.props.price, precision, false).toFixed(
            showPrecision
          );
          const fillAveragePrice = toPrecision(
            order.props.price,
            precision,
            false
          ).toFixed(showPrecision);
          // 成交总额
          const totalFillCurrency = toPrecision(
            order.props.price * Number(order.props.amount),
            2 * 8,
            false
          ).toFixed(8);

          return (
            <TableRow key={index}>
              <TimeCell style={{ width: '12%' }}>
                <div>
                  <span className={order.props.side} />
                  <span className='time'>
                    {moment(order.blockHeight * 1000).format('YYYY/MM/DD HH:mm')}
                  </span>
                </div>
              </TimeCell>
              <IndexCell style={{ width: '5%' }}>{order._id}</IndexCell>
              <PairCell style={{ width: '8%' }}>{`${currencyPair[order.props.pairId][0]} / ${currencyPair[order.props.pairId][1]
                }`}</PairCell>
              <NumberCell style={{ width: '11%' }}>
                {price + ' '}
                <span>{currencyPair[order.props.pairId][1]}</span>
              </NumberCell>
              <NumberCell style={{ width: '14%' }}>
                {amount + ' '}
                <span>{currencyPair[order.props.pairId][0]}</span>
              </NumberCell>
              <FillCell
                className={amount <= 0 ? 'zero' : order.props.side}
                style={{ width: '15%' }}
              >
                <span className='amount'>{amount}</span>
                <span className='percentage'> / {fillPercentage}% </span>
              </FillCell>
              <NumberCell style={{ width: '11%' }}>
                {fillAveragePrice + ' '}
                <span>{currencyPair[order.props.pairId][1]}</span>
              </NumberCell>
              <NumberCell style={{ width: '15%' }}>
                {totalFillCurrency + ' '}
                <span>{currencyPair[order.props.pairId][1]}</span>
              </NumberCell>
              <StatCell>
                {order.status === 'Canceled'
                  ? '已撤销'
                  : order.status === 'Created'
                    ? '完全成交'
                    : order.status === 'ParitialFillAndCanceled'
                      ? '部分成交已撤销'
                      : ''}
              </StatCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
