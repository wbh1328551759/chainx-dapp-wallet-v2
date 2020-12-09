import React, { useContext, useEffect, useState } from 'react';
import xbtcLogo from './xbtc.svg';
import AssetCard from '../components/AssetCard';
import AssetView from '../components/AssetView';
import { AssetLine, DetailWrapper } from '../components/common';
// import { PrimaryButton, DefaultButton } from '@chainx/ui';
import Transfer from '../../../modals/XBTCTransfer';
import { useApi, useToggle } from '@polkadot/react-hooks';
import { AssetsInfo } from "@polkadot/react-hooks-chainx/types";
import Deposite from '../../../modals/deposite';
import Withdraw from '../../../modals/withdraw';
import { useTranslation } from '@polkadot/app-accounts/translate';
import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';
import { DefaultBtn, PrimaryBtn } from '../../components';



export default function (): React.ReactElement {
  const { api } = useApi();
  const { t } = useTranslation();
  const currentAccount = useContext(AccountContext);
  const [isTransferOpen, toggleTransfer] = useToggle();
  const [isDepositeOpen, toggleDeposite] = useToggle();
  const [isWithdraw, toggleWithdraw] = useToggle();
  const [currentAccountInfo, setCurrentAccountInfo] = useState<AssetsInfo>();
  const [n, setN] = useState(0)
  useEffect((): void => {
    async function getAssets(account: string): Promise<any> {
      const res = await api.rpc.xassets.getAssetsByAccount(account);
      let current = {
        Locked: "0",
        Reserved: "0",
        ReservedDexSpot: "0",
        ReservedWithdrawal: "0",
        Usable: "0"
      }as AssetsInfo;
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
    // getAssets('5TqDq71XesuCt8YFrXz2MqF1QqpJKYrg5LtCte3KWB7oyEBB')
    getAssets(currentAccount.currentAccount)
  }, [currentAccount, n])

  const buttonGroup = (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      {isDepositeOpen && (
        <Deposite
          address={currentAccount.currentAccount}
          onClose={toggleDeposite}
        />
      )
      }
      {isWithdraw && (
        <Withdraw
          account={currentAccount.currentAccount}
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
          senderId={currentAccount.currentAccount}
          n={n}
          setN={setN}
        />
      )}

      <PrimaryBtn
        onClick={toggleDeposite}
        style={{ marginRight: 8 }}
      >
        {t('Top-up')}
      </PrimaryBtn>
      <DefaultBtn
        onClick={toggleWithdraw}
        style={{ marginRight: 8 }}
      >
        {t('Withdrawals')}
      </DefaultBtn>
      {api.tx.balances?.transfer && (
        <DefaultBtn
          onClick={toggleTransfer}
          style={{ marginRight: 8 }}
        >
          {t('Transfer')}
        </DefaultBtn>
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
