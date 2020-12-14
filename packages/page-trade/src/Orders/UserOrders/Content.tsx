
import React, { useContext } from 'react';
import { Table, TableBody, TableRow } from '@chainx/ui';
import moment from 'moment';
import { toPrecision } from '../../components/toPrecision';
import {
  ActionCell,
  FillCell,
  IndexCell,
  NumberCell,
  PairCell,
  TimeCell
} from './Wrapper';
import { TxButton } from '@polkadot/react-components';
import {useTranslation} from '../../translate';
import BigNumber from 'bignumber.js';
import {DexContext} from '@polkadot/react-components-chainx/DexProvider';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';

export default function (): React.ReactElement {
  const { t } = useTranslation();
  const { NowOrders } = useContext(DexContext);
  const {currentAccount} = useContext(AccountContext);

  return (
    <Table>
      <TableBody>
        {NowOrders.map((order, index) => {
          const currencyPair = [['PCX', 'BTC']];
          const bgAmount = new BigNumber(toPrecision(Number(order.props.amount), 8))
          const amount = bgAmount.toNumber().toFixed(7)
          const bgPrice = new BigNumber(toPrecision(order.props.price, 9, false))
          const price = bgPrice.toNumber().toFixed(7);
          // const fillPercentage = Number(
          //   (order.remaining / Number(order.props.amount)) * 100
          // ).toFixed(2);

          return (
            <TableRow key={index}>
              <TimeCell style={{ width: '18%' }}>
                <div>
                  <span className={order.props.side} />
                  <span className='time'>
                    {order.blockHeight}
                  </span>
                </div>
              </TimeCell>
              <IndexCell style={{ width: '11%' }}>{order._id}</IndexCell>
              <PairCell
                style={{ width: '16%' }}
              >{currencyPair[order.props.pairId][0]}/{currencyPair[order.props.pairId][1]}</PairCell>
              <NumberCell style={{ width: '17%' }}>
                {price + ' '}
                <span>{currencyPair[order.props.pairId][1]}</span>
              </NumberCell>
              <NumberCell style={{ width: '19%' }}>
                {amount + ' '}
                <span>{currencyPair[order.props.pairId][0]}</span>
              </NumberCell>
              {/*冻结金额*/}
              {/*<NumberCell style={{ width: '16%' }}>*/}
              {/*  {order.props.side === 'Sell'*/}
              {/*    ? amount + ' '*/}
              {/*    : amount + ' '}*/}
              {/*  <span>{currencyPair[order.props.pairId][order.props.side === 'Sell' ? 0 : 1]}</span>*/}
              {/*</NumberCell>*/}
              {/*成交率*/}
              {/*<FillCell*/}
              {/*  className={order.remaining <= 0 ? 'zero' : order.props.side}*/}
              {/*  style={{ width: '16%' }}*/}
              {/*>*/}
              {/*  <span className='amount'>{`${toPrecision(*/}
              {/*    order.remaining,*/}
              {/*    8*/}
              {/*  )}`}</span>*/}
              {/*  <span className='percentage'> / {fillPercentage}% </span>*/}
              {/*</FillCell>*/}
              <ActionCell>
                <TxButton
                  accountId={currentAccount}
                  icon={'window-close'}
                  label={t('Cancel')}
                  params={[0, order._id]}
                  tx='xSpot.cancelOrder'
                // onClick={sign}
                />
              </ActionCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
