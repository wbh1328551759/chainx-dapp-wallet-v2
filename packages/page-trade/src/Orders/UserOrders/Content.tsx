
import React, { useContext, useState } from 'react';
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
import cancelIcon from '../svg/cancel.svg';
import cancelDisabledIcon from '../svg/cancel-disabled.svg';
import useOrders from '@polkadot/react-hooks-chainx/useOrders';
import { TxButton } from '@polkadot/react-components';
import { OrderContext } from '../OrderProvider';

export default function ({ nodeName }: NodeNameProps): React.ReactElement<NodeNameProps> {
  const [disabled, setDisabled] = useState(false);
  const [targetId, setTargetId] = useState(null);
  // const { NowOrders } = useOrders(nodeName);
  const {  NowOrders } = useContext(OrderContext);
  const cancelOrder = async (id: number) => {
    setDisabled(true);
    setTargetId(id);
  };

  return (
    <Table>
      <TableBody>
        {NowOrders.map((order, index) => {
          const currencyPair = [['PCX', 'BTC']];
          const amount = toPrecision(Number(order.props.amount), 8);
          const precision = 9;
          const unitPrecision = 1;
          const price = toPrecision(order.props.price, precision, false).toFixed(
            precision - unitPrecision
          );
          const fillPercentage = Number(
            (order.remaining / Number(order.props.amount)) * 100
          ).toFixed(2);

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
              <PairCell
                style={{ width: '8%' }}
              >{currencyPair[order.props.pairId][0]}/{currencyPair[order.props.pairId][1]}</PairCell>
              <NumberCell style={{ width: '11%' }}>
                {price + ' '}
                <span>{currencyPair[order.props.pairId][1]}</span>
              </NumberCell>
              <NumberCell style={{ width: '13%' }}>
                {amount + ' '}
                <span>{currencyPair[order.props.pairId][0]}</span>
              </NumberCell>
              <NumberCell style={{ width: '16%' }}>
                {order.props.side === 'Sell'
                  ? amount + ' '
                  : amount + ' '}
                <span>{currencyPair[order.props.pairId][order.props.side === 'Sell' ? 0 : 1]}</span>
                {/* <span>{currencyPair[order.props.pairId][0]}</span> */}

              </NumberCell>
              <FillCell
                className={order.remaining <= 0 ? 'zero' : order.props.side}
                style={{ width: '16%' }}
              >
                <span className='amount'>{`${toPrecision(
                  order.remaining,
                  8
                )}`}</span>
                <span className='percentage'> / {fillPercentage}% </span>
              </FillCell>
              <ActionCell>
                <TxButton
                  accountId={nodeName}
                  icon={'window-close'}
                  isDisabled={disabled}
                  label={'取消'}
                  params={[0, order._id]}
                  tx='xSpot.cancelOrder'
                // onClick={sign}
                />
                {/* {disabled && targetId === order._id ? ( */}
                {/*  <img */}
                {/*    src={cancelDisabledIcon} */}
                {/*    alt="cancel" */}
                {/*    onClick={() => cancelOrder(order._id)} */}
                {/*  /> */}
                {/* ) : ( */}
                {/*  <img */}
                {/*    src={cancelIcon} */}
                {/*    alt="cancel" */}
                {/*    onClick={() => cancelOrder(order._id)} */}
                {/*    className="cancel" */}
                {/*  /> */}
                {/* )} */}
              </ActionCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
