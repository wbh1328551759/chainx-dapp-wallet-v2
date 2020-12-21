import React, {useContext, useEffect, useState} from 'react';

import Card from './Card';
import styled from 'styled-components';
import AssetView from './AssetView';
import Logo from './Logo';
import AccountInfo from './AccountInfo';
import backgroundImg from './background.svg';
// import {WhiteButton} from '@chainx/ui';
import {useAccounts, useApi, useToggle} from '@polkadot/react-hooks';
import Transfer from '@polkadot/app-accounts-chainx/modals/Transfer';
import usePcxFree from '@polkadot/react-hooks-chainx/usePcxFree';
import {useTranslation} from '@polkadot/app-accounts-chainx/translate';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';
import BN from 'bn.js';
import {ActionStatus} from '@polkadot/react-components/Status/types';
import Button from '@polkadot/react-components-chainx/Button';

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
  .whiteBtn {
    color: rgba(0, 0, 0, 0.72);
    border: 1px solid rgba(0,0,0,0.04);
    padding: 1px 2em;
    font-size: 0.875rem;
    min-width: 64px;
    box-sizing: border-box;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-family: Cairo, Arial, sans-serif;
    font-weight: 500;
    line-height: 1.75;
    border-radius: 14px;
    text-transform: none;
    margin: 0 0 4px 32px;
    &:hover {
      background: #E8E9EA !important;
      color: rgba(0, 0, 0, 0.72) !important;
      box-shadow: none;
    }
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
  const {isApiReady} = useApi();
  const {t} = useTranslation();
  const {hasAccounts} = useAccounts()
  const [isTransferOpen, toggleTransfer] = useToggle();
  const [n, setN] = useState(0);
  const {currentAccount} = useContext(AccountContext);
  const pcxFree: PcxFreeInfo = usePcxFree(currentAccount, n);
  const [allBalance, setAllBalance] = useState<number>(0)
  const [usableBalance, setUsableBalance] = useState<number>(0)
  const [freeFrozen, setFreeFrozen] = useState<number>(0)
  // const allBalance = freeBalance.add(new BN(pcxFree.reserved)).toNumber();
  // const bgUsableBalance = new BN(Number(pcxFree.free) - Number(pcxFree.feeFrozen));
  // const bgFreeFrozen = new BN(pcxFree.feeFrozen);

  const [defaultValue, setDefaultValue] = useState<PcxFreeInfo>({})

  useEffect(() => {
    if(!window.localStorage.getItem('pcxFreeInfo')){
      window.localStorage.setItem('pcxFreeInfo',JSON.stringify(defaultValue))
    }else{
      setDefaultValue(JSON.parse(window.localStorage.getItem('pcxFreeInfo')) )
      if(pcxFree){
        window.localStorage.setItem('pcxFreeInfo', JSON.stringify({
          free: pcxFree.free,
          reserved: pcxFree.reserved,
          miscFrozen: pcxFree.miscFrozen,
          feeFrozen: pcxFree.feeFrozen
        }))
      }
    }

  },[currentAccount, pcxFree, isApiReady])

  useEffect(() => {
    if(isApiReady && pcxFree){
      const bgFree = new BN(pcxFree.free)
      setAllBalance(bgFree.add(new BN(pcxFree.reserved)).toNumber())
      setUsableBalance(bgFree.sub(new BN(pcxFree.feeFrozen)).toNumber())
      setFreeFrozen((new BN(pcxFree.feeFrozen)).toNumber())
    }else{
      const bgFree = new BN(defaultValue.free )
      setAllBalance(bgFree.add(new BN(defaultValue.reserved)).toNumber() )
      setUsableBalance(bgFree.sub(new BN(defaultValue.feeFrozen)).toNumber())
      setFreeFrozen(new BN(defaultValue.feeFrozen).toNumber())
    }

  }, [defaultValue, isApiReady, pcxFree])

  return (
    <Card>
      <InnerWrapper>
        <header>
          <Logo/>
          {isApiReady? <AccountInfo/>: <div>{currentAccount}</div>}
        </header>
        <section className='free' key='free'>
          <AssetView
            bold
            title={t('free balance')}
            value={usableBalance}
          />

          {/*{api.api.tx.balances?.transfer && currentAccount && (*/}
            <Button
              className="whiteBtn"
              onClick={toggleTransfer}
              // style={{marginLeft: 32, height: 28, marginBottom: 4}}
              isBasic={true}
              isDisabled={!isApiReady || !currentAccount || !hasAccounts}
            >
              {t('Transfer')}
            </Button>
          {/*)}*/}
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
                value={freeFrozen}
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
