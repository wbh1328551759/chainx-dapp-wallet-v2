import React, {useContext, useEffect, useState} from 'react';

import Card from './Card';
import styled from 'styled-components';
import AssetView from './AssetView';
import Logo from './Logo';
import AccountInfo from './AccountInfo';
import backgroundImg from './background.svg';
import {WhiteButton} from '@chainx/ui';
import {useApi, useToggle} from '@polkadot/react-hooks';
import Transfer from '@polkadot/app-accounts/modals/Transfer';
import usePcxFree from '@polkadot/react-hooks-chainx/usePcxFree';
import {useTranslation} from '@polkadot/app-accounts/translate';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';
import BN from 'bn.js';
import {ActionStatus} from '@polkadot/react-components/Status/types';

const InnerWrapper = styled.div`
  position: relative;
  opacity: 0.8;
  background-image: linear-gradient(90deg, #ffe981 0%, #f6ca4a 100%);
  border-radius: 10px;
  padding: 16px;
  min-height: 222px;

  header {
    display: flex;
    justify-content: space-between;
  }

  section.free {
    display: flex;
    margin-top: 10px;
    align-items: flex-end;
  }

  section.details {
    display: flex;
    margin-top: 32px;
    & > div:not(:first-of-type) {
      margin-left: 66px;
    }
  }
`;

const CornerBackground = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  background-image: url(${backgroundImg});
  width: 179px;
  height: 147px;
  opacity: 0.2;
`;

interface PcxCardProps {
  onStatusChange: (status: ActionStatus) => void;
}

export default function ({onStatusChange}: PcxCardProps): React.ReactElement<PcxCardProps> {
  const api = useApi();
  const {t} = useTranslation();
  const [isTransferOpen, toggleTransfer] = useToggle();
  const [n, setN] = useState(0);

  const {currentAccount} = useContext(AccountContext);
  const pcxFree = usePcxFree(currentAccount, n);
  const freeBalance = new BN(pcxFree.free);
  const allBalance = freeBalance.add(new BN(pcxFree.reserved)).toNumber();
  const bgUsableBalance = new BN(Number(pcxFree.free) - Number(pcxFree.feeFrozen));
  const bgFeeFrozen = new BN(pcxFree.feeFrozen);
  return (
    <Card>
      <InnerWrapper>
        <header>
          <Logo/>
          <AccountInfo/>
        </header>
        <section className='free' key='free'>
          <AssetView
            bold
            title={t('free balance')}
            value={bgUsableBalance.toNumber()}
          />

          {api.api.tx.balances?.transfer && currentAccount && (
            <WhiteButton
              onClick={toggleTransfer}
              style={{marginLeft: 32, height: 28, marginBottom: 4}}
            >
              {t('Transfer')}
            </WhiteButton>
          )}
        </section>
        <section className='details' key="details">
          {(
            <>
              <AssetView
                key={Math.random()}
                title={t('total balance')}
                value={allBalance}
              />
              <AssetView
                key={Math.random()}
                title={t('frozen voting')}
                value={bgFeeFrozen.toNumber()}
              />
              {/* <AssetView
                title="交易冻结"
                value="8.00000000"
                precision={precisionData.precision}
              />
              <AssetView
                title="赎回冻结"
                value="0.00000000"
                precision={precisionData.precision}
              /> */}
            </>
          )}
        </section>
        <CornerBackground/>
        {isTransferOpen && (
          <Transfer
            key='modal-transfer'
            onClose={toggleTransfer}
            senderId={currentAccount}
            onStatusChange={onStatusChange}
            setN={setN}
          />
        )}
      </InnerWrapper>
    </Card>
  );
}
