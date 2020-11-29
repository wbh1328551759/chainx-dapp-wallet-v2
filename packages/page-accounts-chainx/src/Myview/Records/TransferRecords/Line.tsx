
import React, { useRef, useState } from 'react';
import Hash from './Hash';
import Address from './Address';
import Detail from '../components/Detail';
import Label from '../components/Label';
import { toPrecision } from '@polkadot/app-accounts-chainx/Myview/toPrecision';
import moment from 'moment';
import { useTranslation } from '@polkadot/react-components/translate';
import useOutsideClick from '@polkadot/app-accounts-chainx/Myview/useOutsideClick';

export default function ({ transfer }: any) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);


  const wrapper = useRef(null);

  useOutsideClick(wrapper, () => {
    setOpen(false);
  });
  return (
    <div className='line'
      onClick={() => setOpen(!open)}
      ref={wrapper}>
      <header>
        <span> PCX </span>
        <span>{moment(new Date(transfer.indexer.blockTime)).format('YYYY/MM/DD')}</span>
      </header>
      <main>
        <span>{toPrecision(transfer.data[2], 8)}</span>
        <span>{transfer.data[0] === transfer.data[1] ? t('In') : t('Out')}</span>
      </main>
      {open ? (
        <Detail>
          <li>
            <Label>{t('Tx ID')}</Label>
            <Hash hash={transfer.extrinsicHash} />
          </li>
          <li>
            <Label>{t('Address')}</Label>
            <Address address={transfer.data[1]} />
          </li>
          {/* <li className="memo"> */}
          {/*  <Label>{}</Label> */}
          {/*  <p className="memo">{transfer.memo}</p> */}
          {/* </li> */}
        </Detail>
      ) : null}
    </div>
  );
}
