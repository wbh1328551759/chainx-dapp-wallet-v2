import React, {useContext, useEffect, useState} from 'react';

import Card from './Card';
import styled from 'styled-components';
import AssetView from './AssetView';
import Logo from './Logo';
import AccountInfo from './AccountInfo';
import backgroundImg from './background.svg';
// import {WhiteButton} from '@chainx/ui';
import {useApi, useToggle} from '@polkadot/react-hooks';
import Transfer from '@polkadot/app-accounts-chainx/modals/Transfer';
import usePcxFree from '@polkadot/react-hooks-chainx/usePcxFree';
import {useTranslation} from '@polkadot/app-accounts-chainx/translate';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';
import BN from 'bn.js';
import {ActionStatus} from '@polkadot/react-components/Status/types';
import Button from '@polkadot/react-components-chainx/Button';
import {useLocalStorage} from '@polkadot/react-hooks-chainx';

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

interface accountAssetInfo {
  usableBalance: number;
  allBalance: number;
  freeFrozen: number;
}

export default function ({onStatusChange}: PcxCardProps): React.ReactElement<PcxCardProps> {
  const {isApiReady} = useApi();
  const api = useApi()

  const {t} = useTranslation();
  const [isTransferOpen, toggleTransfer] = useToggle();
  const [n, setN] = useState(0);
  const [storedValue, setValue] = useLocalStorage('accountAsset');
  const {currentAccount} = useContext(AccountContext);
  const pcxFree = usePcxFree(currentAccount, n);
  const freeBalance = new BN(pcxFree.free);
  const allBalance = freeBalance.add(new BN(pcxFree.reserved)).toNumber();
  const bgUsableBalance = new BN(Number(pcxFree.free) - Number(pcxFree.feeFrozen));
  const bgFeeFrozen = new BN(pcxFree.feeFrozen);

  const a: accountAssetInfo  = JSON.parse(storedValue) as accountAssetInfo

  const [de, setDefault] = useState<accountAssetInfo>(a)

  console.log('de')
  console.log(de)
  useEffect(() => {
    // const defalutValue = JSON.stringify({
    //   usableBalance: 0,
    //   allBalance: 0,
    //   freeFrozen: 0
    // })
    //   const a: string = window.localStorage.getItem('accountAsset') || defalutValue
    //   const b = JSON.parse(a)
    //   setValue(b)

  },[])

  useEffect(() => {
    const accountAssetInfo: accountAssetInfo = {
      usableBalance: bgUsableBalance.toNumber(),
      allBalance,
      freeFrozen: bgFeeFrozen.toNumber()
    };
    setValue(JSON.stringify(accountAssetInfo));
    console.log('放进去了')
  }, [currentAccount, pcxFree]);

  console.log('storedValue')
  console.log('pcxFree')
  console.log(JSON.stringify(pcxFree))
  // console.log(JSON.parse(storedValue))
  return (
    <Card>
      <InnerWrapper>
        <header>
          <Logo/>
          {/*<AccountInfo/>*/}
        </header>
        <section className='free' key='free'>
          <AssetView
            bold
            title={t('free balance')}
            value={isApiReady? bgUsableBalance.toNumber(): de.usableBalance}
          />

          {isApiReady && api.api.tx.balances?.transfer && currentAccount && (
            <Button
              className="whiteBtn"
              onClick={toggleTransfer}
              // style={{marginLeft: 32, height: 28, marginBottom: 4}}
              isBasic={true}
            >
              {t('Transfer')}
            </Button>
          )}
        </section>
        <section className='details' key="details">
          {(
            <>
              <AssetView
                key={Math.random()}
                title={t('total balance')}
                value={isApiReady? allBalance: de.allBalance}
              />
              <AssetView
                key={Math.random()}
                title={t('frozen voting')}
                value={isApiReady? bgFeeFrozen.toNumber(): de.freeFrozen}
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
