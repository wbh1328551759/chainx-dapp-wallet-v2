import React, { useContext, useEffect, useState } from 'react';
import xbtcLogo from './xbtc.svg';
import AssetCard from '../components/AssetCard';
import AssetView from '../components/AssetView';
import { AssetLine, DetailWrapper } from '../components/common';
import { PrimaryButton, DefaultButton } from '@chainx/ui';
import Transfer from '../../../modals/XBTCTransfer';
import { useAccounts, useApi, useToggle } from '@polkadot/react-hooks-chainx';
import { AssetsInfo } from "@polkadot/react-hooks-chainx/types";
import Deposite from '../../../modals/deposite';
import Withdraw from '../../../modals/withdraw';
import { useTranslation } from '@polkadot/app-accounts/translate';
import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';



export default function (): React.ReactElement {
  const { api } = useApi();
  const { t } = useTranslation();
  const { allAccounts } = useAccounts();
  const currentAccount = allAccounts[0]
  //useContext(AccountContext);


  const [isTransferOpen, toggleTransfer] = useToggle();
  const [isDepositeOpen, toggleDeposite] = useToggle();
  const [isWithdraw, toggleWithdraw] = useToggle();
  const [currentAccountInfo, setCurrentAccountInfo] = useState<AssetsInfo>();


  useEffect((): void => {
    async function getAssets(account) {
      const res = await api.rpc.xassets.getAssetsByAccount(account);
      let current: AssetsInfo = {
        Locked: "0",
        Reserved: "0",
        ReservedDexSpot: "0",
        ReservedWithdrawal: "0",
        Usable: "0"
      };
      const userAssets = JSON.parse(res);

      Object.keys(userAssets).forEach((key: string) => {
        current = userAssets[key] as AssetsInfo;
      });

      const dividendRes = await api.rpc.xminingasset.getDividendByAccount(
        account
      );
      let currentDividend: any = "0";
      const userDividend = JSON.parse(dividendRes);

      Object.keys(userDividend).forEach((key: string) => {
        currentDividend = userDividend[key];
      });

      if (JSON.stringify(current) === "{}") {
        current = {
          Locked: "0",
          Reserved: "0",
          ReservedDexSpot: "0",
          ReservedWithdrawal: "0",
          Usable: "0"
        } as AssetsInfo;
      }

      current = Object.assign(current, {
        account: account,
        assetName: "X-BTC",
        XbtcInterests: currentDividend
      });
      setCurrentAccountInfo(current)

    }
    getAssets(currentAccount)
  }, [currentAccount])

  const buttonGroup = (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
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
        />
      )
      }
      {isTransferOpen && (
        <Transfer
          key='modal-transfer'
          onClose={toggleTransfer}
          senderId={currentAccount}
        />
      )}

      <PrimaryButton
        onClick={toggleDeposite}
        style={{ marginRight: 8 }}
      >
        {t('Top-up')}
      </PrimaryButton>
      <DefaultButton
        onClick={toggleWithdraw}
        style={{ marginRight: 8 }}
      >
        {t('Withdrawals')}
      </DefaultButton>
      {api.tx.balances?.transfer && (
        <DefaultButton
          onClick={toggleTransfer}
          style={{ marginRight: 8 }}
        >
          {t('Transfer')}
        </DefaultButton>
      )}
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
