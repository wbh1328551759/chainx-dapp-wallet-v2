
import React, { useState } from 'react';
import styled from 'styled-components';
import TransferRecords from './TransferRecords';
import { useTranslation } from '@polkadot/app-accounts/translate';
import DepositList from '@polkadot/app-accounts-chainx/Myview/Records/CrossChainRecord/DepositList';
import WithdrawalList from '@polkadot/app-accounts-chainx/Myview/Records/CrossChainRecord/WithdrawalList';

const Wrapper = styled.section`
  border: 1px solid #dce0e2;
  border-radius: 10px;
  padding: 16px;
  background: #fff;
`;

const Wrappers = styled.div`
    > ul {
      display: flex;
      justify-content: space-around;
      & > li {
        opacity: 0.32;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.12px;
        line-height: 20px;
        cursor: pointer;
        padding-bottom: 13px;
        > a{
          opacity: 1;
        }
        &.active {
          border-bottom: 3px solid #f6c94a;
          opacity: 0.72;
        }
        &:not(:first-of-type) {
          margin-left: 24px;
        }
      }
    }

  & > main {
    flex: 1;
    margin: 0 -16px;
    border-top: 1px solid #eee;
  }
`;

export default function (): React.ReactElement {
  const [recordType, setRecordType] = useState(1);
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Wrappers>
        <ul>
          <li
            className={recordType === 1 ? 'active' : ''}
            onClick={() => setRecordType(1)}
          >
            {t('Transfers')}
          </li>
          <li
            className={recordType === 2 ? 'active' : ''}
            onClick={() => setRecordType(2)}
          >
            {t('Recharge')}
          </li>
          <li
            className={recordType === 3 ? 'active' : ''}
            onClick={() => setRecordType(3)}
          >
            {t('Withdrawal')}
          </li>
        </ul>
        <main>
          {recordType === 1 ? <TransferRecords /> : null}
          {recordType === 2 ? <DepositList /> : null}
          {recordType === 3 ? <WithdrawalList /> : null}
        </main>
      </Wrappers>
    </Wrapper>
  );
}
