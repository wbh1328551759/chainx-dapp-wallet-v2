import React, {useContext, useEffect, useState} from 'react';
import xbtcLogo from './xbtc.svg';
import AssetCard from '../components/AssetCard';
import AssetView from '../components/AssetView';
import {AssetLine, DetailWrapper} from '../components/common';
// import { PrimaryButton, DefaultButton } from '@chainx/ui';
import Transfer from '../../../modals/XBTCTransfer';
import {useAccounts, useApi, useToggle} from '@polkadot/react-hooks';
import {AssetsInfo} from '@polkadot/react-hooks-chainx/types';
// import Deposite from '../../../modals/deposite';
import Deposite from '../../../modals/deposite/deposite';
import Withdraw from '../../../modals/withdraw';
import {useTranslation} from '@polkadot/app-accounts/translate';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';
import Button from '@polkadot/react-components-chainx/Button';
import {useLocalStorage} from '@polkadot/react-hooks-chainx';


export default function (): React.ReactElement {
  const {api, isApiReady} = useApi();
  const {t} = useTranslation();
  const {currentAccount} = useContext(AccountContext);
  const [isTransferOpen, toggleTransfer] = useToggle();
  const [isDepositeOpen, toggleDeposite] = useToggle();
  const [isWithdraw, toggleWithdraw] = useToggle();
  const [currentAccountInfo, setCurrentAccountInfo] = useState<AssetsInfo>();
  const [n, setN] = useState(0);
  const {hasAccounts} = useAccounts()
  const [, setValue] = useLocalStorage('xbtcInfo');

  useEffect((): void => {
    async function getAssets(account: string): Promise<any> {
      const res = await api.rpc.xassets.getAssetsByAccount(account);
      let current = {
        Locked: '0',
        Reserved: '0',
        ReservedDexSpot: '0',
        ReservedWithdrawal: '0',
        Usable: '0'
      } as AssetsInfo;
      const userAssets = JSON.parse(res);
      Object.keys(userAssets).forEach((key: string) => {
        current = userAssets[key] as AssetsInfo;
      });

      const dividendRes = await api.rpc.xminingasset.getDividendByAccount(
        account
      );
      let currentDividend: any = '0';
      const userDividend = JSON.parse(dividendRes);

      Object.keys(userDividend).forEach((key: string) => {
        currentDividend = userDividend[key];
      });

      if (JSON.stringify(current) === '{}') {
        current = {
          Locked: '0',
          Reserved: '0',
          ReservedDexSpot: '0',
          ReservedWithdrawal: '0',
          Usable: '0'
        } as AssetsInfo;
      }

      current = Object.assign(current, {
        account: account,
        assetName: 'X-BTC',
        XbtcInterests: currentDividend
      });
      setValue(JSON.stringify(current));
      setCurrentAccountInfo(current);
    }

    getAssets(currentAccount);
  }, [currentAccount, n]);

  const buttonGroup = (
    <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
      {isDepositeOpen && (
        <Deposite
          address={currentAccount}
          onClose={toggleDeposite}
        />
      )
      }
      {isWithdraw && (
        <Withdraw
          account={currentAccount}
          btc={currentAccountInfo?.Usable}
          onClose={toggleWithdraw}
          setN={setN}
        />
      )
      }
      {isTransferOpen && (
        <Transfer
          key='modal-transfer'
          onClose={toggleTransfer}
          senderId={currentAccount}
          n={n}
          setN={setN}
        />
      )}

      <Button
        className="btnLists primaryBtn"
        onClick={toggleDeposite}
        isDisabled={!isApiReady || !currentAccount || !hasAccounts}
      >
        {t('Top-up')}
      </Button>
      <Button
        className="btnLists defaultBtn"
        onClick={toggleWithdraw}
        isDisabled={!isApiReady || !currentAccount || !hasAccounts}
      >
        {t('Withdrawals')}
      </Button>
      <Button
        className="btnLists defaultBtn"
        onClick={toggleTransfer}
        isDisabled={!isApiReady || !currentAccount || !hasAccounts}
      >
        {t('Transfer')}
      </Button>

    </div>
  );

  return (
    <AssetCard buttonGroup={buttonGroup} logo={xbtcLogo}>
      <div className='details'>
        <DetailWrapper>
          <AssetLine>
            <AssetView
              assetsInfo={currentAccountInfo}
            />
          </AssetLine>
        </DetailWrapper>
      </div>
    </AssetCard>
  );
}
