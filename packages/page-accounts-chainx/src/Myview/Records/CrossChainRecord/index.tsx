
import React, { useState } from 'react';
import styled from 'styled-components';
import DepositList from './DepositList';
import WithdrawalList from './WithdrawalList';
import { useTranslation } from '@polkadot/app-accounts/translate';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  & > header {
    padding: 12px 16px 0;
    border-bottom: 1px solid #eee;
    ul {
      display: flex;

      li {
        opacity: 0.32;
        font-size: 13px;
        color: #000000;
        letter-spacing: 0.2px;
        line-height: 18px;
        cursor: pointer;
        &:not(:first-of-type) {
          margin-left: 24px;
        }
        &.active {
          opacity: 0.72;
          font-weight: 500;
        }
      }
    }
  }

  & > main {
    flex: 1;
    overflow-y: auto;
  }
`;

export default function ({ nodeName }: NodeNameProps): React.ReactElement<NodeNameProps> {
  const [option, setOption] = useState<'deposit' | 'withdraw'>('deposit');
  const { t } = useTranslation();

  return (
    <Wrapper>
      <header>
        <ul>
          <li
            className={option === 'deposit' ? 'active' : ''}
            onClick={() => setOption('deposit')}
          >
            {t('Top-up')}
          </li>
          <li
            className={option === 'withdraw' ? 'active' : ''}
            onClick={() => setOption('withdraw')}
          >
            {t('Withdrawals')}
          </li>
          {/* <li */}
          {/*  onClick={() => setOption('lock')} */}
          {/*  className={option === 'lock' ? 'active' : ''} */}
          {/* > */}
          {/*  锁仓 */}
          {/* </li> */}
        </ul>
      </header>
      <main>

        {option === 'deposit' ? <DepositList /> : null}
        {option === 'withdraw' ? <WithdrawalList /> : null}

      </main>
    </Wrapper>
  );
}
