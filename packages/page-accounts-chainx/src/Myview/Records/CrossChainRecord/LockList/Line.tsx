
import React, { useRef, useState } from 'react';
import moment from 'moment';
// import { toPrecision } from '../../../../../utils'
import Detail from '../../components/Detail';
import BtcTx from '../../components/BtcTx';
import Label from '../../components/Label';
import BtcAddress from '../../components/BtcAddress';
// import useOutsideClick from '../../../../../utils/useClickOutside'

export default function ({ lock }: any) {
  // const precision = useSelector(lbtcPrecisionSelector)
  const [open, setOpen] = useState(false);
  const timeFormat = 'YYYY/MM/DD HH:mm:ss';
  const wrapper = useRef(null);
  // useOutsideClick(wrapper, () => {
  //   setOpen(false)
  // })

  return (
    <li onClick={() => setOpen(!open)}
      ref={wrapper}>
      <header>
        <span>L-BTC</span>
        <span>{moment(lock.lock_time).format(timeFormat)}</span>
      </header>
      <main>
        <span>
          {lock.type === 0 ? '+' : '-'}
          {/* {toPrecision(lock.value, precision)} */}
        </span>
        <span>
          {(
            lock.type === 0
              ? '锁仓'
              : '解锁'
          )}
        </span>
      </main>
      {open ? (
        <Detail>
          <li>
            <Label>原链交易 ID</Label>
            <BtcTx hash={lock.hash} />
          </li>
          <li>
            <Label>地址</Label>
            <BtcAddress address={lock.address} />
          </li>
        </Detail>
      ) : null}
    </li>
  );
}
