
import React, { useEffect, useState } from 'react';
import { Dialog } from '@chainx/ui';
import styled from 'styled-components';

import { u8aToHex } from '@polkadot/util';
import ClipBoard from './ClipBoard';
import infoIcon from './explan.svg';
import { useTranslation } from '../../translate';

const StyledDialog = styled(Dialog)`
  main.content {
    padding: 16px;

    section.show-code {
      margin-top: 12px;
      background: #f2f3f4;
      border: 1px solid #dce0e2;
      border-radius: 6px;
      padding: 14px 12px;

      h3 {
        display: flex;
        justify-content: space-between;
        margin: 0 0 8px;
        opacity: 0.72;
        font-size: 13px;
        color: #000000;
        letter-spacing: 0.2px;
        line-height: 18px;
        span.title {
          font-weight: 500;
        }

        span.addr {
          opacity: 0.32;
          font-size: 13px;
          font-weight: 400;
          color: #000000;
          letter-spacing: 0.2px;
          text-align: right;
          line-height: 18px;
        }

        .channel span {
          opacity: 0.56;
          font-size: 13px;
          color: #000000;
          letter-spacing: 0.2px;
          text-align: right;
          line-height: 18px;
        }
      }

      .hex {
        margin-top: 8px;
        opacity: 0.32;
        font-size: 13px;
        color: #000000;
        letter-spacing: 0.2px;
        line-height: 18px;
      }
    }

    ul.info {
      margin-top: 12px;
      li {
        display: flex;
        align-items: center;
        img {
          width: 16px;
          margin-right: 6px;
        }

        &:not(:first-of-type) {
          margin-top: 6px;
        }

        opacity: 0.56;
        font-size: 12px;
        color: #000000;
        letter-spacing: 0.2px;
        line-height: 16px;
      }
    }
  }

  h1 {
    margin: 0;
    opacity: 0.72;
    font-size: 14px;
    color: #000000;
    letter-spacing: 0.12px;
    line-height: 20px;
    span.step {
      color: #ecb417;
      margin-right: 8px;
    }
    &.step-2 {
      margin-top: 16px;
    }
  }

  p {
    opacity: 0.56;
    font-size: 14px;
    color: #000000;
    letter-spacing: 0.12px;
    line-height: 20px;
    &.op-return,
    &.input {
      margin-top: 8px;
    }
  }
`;

interface Props {
  onClose: () => void;
  address: string
}

export default function ({ address, onClose }: Props) {
  // const [checked, setChecked] = useState(false)
  const { t } = useTranslation();
  const [channel, setChannel] = useState('');
  const addressHex = u8aToHex(
    new TextEncoder().encode(`${address}${channel ? '@' + channel : ''}`)
  ).replace(/^0x/, '');

  return (
    <StyledDialog
      handleClose={onClose}
      open
      title={'跨链充值'}
    >
      <main className='content'>
        <h1>
          <span className='step'>{t('the first step')}</span>
          <span className='text'>{t('get OP_RETURN')}</span>
        </h1>
        <p className={'op-return'}>{t('get the information for the 16-OP_RETURN address')}</p>
        <section className='show-code'>
          {/* <h3> */}
          {/*  <span className="title">OP_RETURN</span> */}
          {/*  <CheckBox */}
          {/*    checked={checked} */}
          {/*    onClick={() => setChecked(!checked)} */}
          {/*    className="channel" */}
          {/*  > */}
          {/*    {$t('ASSET_ADD_REFERRER')} */}
          {/*  </CheckBox> */}
          {/* </h3> */}
          {/* {checked ? ( */}
          {/*  <IntentionSelect */}
          {/*    value={channel} */}
          {/*    onChange={setChannel} */}
          {/*    style={{ marginBottom: 8 }} */}
          {/*  /> */}
          {/* ) : null} */}
          <ClipBoard className='hex'
            id='' >{addressHex}</ClipBoard>
        </section>
        <h1 className='step-2'>
          <span className='step'>{t('the second step')}</span>
          <span className='text'>{t('start a cross-chain top-up withdrawal')}</span>
        </h1>
        <p className='input'>{t('recharge OP_RETURN trust\'s hot multi-sign address with a wallet that supports OP_RETURN information')}</p>
        <ul className={'info'}>
          <li>
            <img alt='info'
              src={infoIcon} />
            <span>{t('the top-up amount must be greater than 0.001 BTC')}</span>
          </li>
          <li>
            <img alt='info'
              src={infoIcon} />
            <span>{t('currently, only cross-chain top-up initiated by BTC addresses starting with 1 and 3 is supported')}</span>
          </li>
        </ul>
        <section className='show-code'>
          <h3 style={{ marginBottom: 0 }}>
            <span className='title'>{t('Trust hot multi-signature address')}</span>
            <ClipBoard className={'addr'}
              id=''>2N5QAjp4oaUbJCQqhsMiwSK1oYGJNUnAgqM</ClipBoard>
          </h3>
        </section>

      </main>
    </StyledDialog>
  );
}
