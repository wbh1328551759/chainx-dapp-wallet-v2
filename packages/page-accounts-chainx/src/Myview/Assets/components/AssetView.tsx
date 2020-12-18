import {AssetsInfo} from '@polkadot/react-hooks-chainx/types';
import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import Free from './Free';
import Frees from './Frees';
import InfoView from './InfoView';
import {useTranslation} from '@polkadot/app-accounts/translate';
import BN from 'bn.js';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';
import {useApi} from '@polkadot/react-hooks';
import {isPaste} from '@polkadot/react-components/Input';


export const AssetDetail = styled.div`
  display: flex;
  margin-top: 14px;
  div {
    display: flex;
    flex-direction: row;
    margin-right: 26px;
    width: 50%;
    div {
      margin-bottom: 10px;
      width: 50%;
    }
  }
`;

export const AssetLine = styled.div`
  display: flex;
  & > div {
    display: flex;
    flex-direction: column;
  }

`;

type Props = {
  nodeName?: string,
  setNodeName?: React.Dispatch<string> | undefined,
  assetsInfo: AssetsInfo | undefined;
}

interface XbtcFreeInfo {
  usableBalance: number,
  reservedDexSpotBalance: number,
  reservedWithdrawalBalance: number,
  allBalance: number
}

export default function ({assetsInfo}: Props): React.ReactElement<Props> {
  const {isApiReady} = useApi();

  const {t} = useTranslation();
  const currentAccount = useContext(AccountContext);

  const usable = new BN(assetsInfo?.Usable);
  const reservedDexSpot = new BN(assetsInfo?.ReservedDexSpot);
  const reservedWithdrawal = new BN(assetsInfo?.ReservedWithdrawal);
  const allBalance = usable.add(reservedDexSpot).add(reservedWithdrawal);

  const [defaultXbtcValue, setDefaultXbtcValue] = useState<XbtcFreeInfo>();
  const [defaultXbtc, setDefaultXbtc] = useState<AssetsInfo>()

  useEffect(() => {
    setDefaultXbtc(JSON.parse(window.localStorage.getItem('xbtcInfo')));
    if (defaultXbtc) {
      setDefaultXbtcValue({
        usableBalance: defaultXbtc.Usable,
        reservedDexSpotBalance: defaultXbtc.ReservedDexSpot,
        reservedWithdrawalBalance: defaultXbtc.ReservedWithdrawal,
        allBalance: new BN(defaultXbtc.ReservedDexSpot).add(new BN(defaultXbtc.ReservedWithdrawal)).add(new BN(defaultXbtc.Usable))
      });
    }


  }, [currentAccount, isApiReady, assetsInfo]);

  console.log('defaultXbtcValue')
  console.log(defaultXbtcValue)
  return (
    <div>
      <AssetLine>
        <Frees
          asset='Balance'
          free={isApiReady ? (assetsInfo?.Usable ? usable.toNumber() : '') : defaultXbtcValue?.usableBalance}
          precision={8}
        />
      </AssetLine>
      <AssetDetail>
        <div>
          <AssetLine>
            <InfoView info='Bitcoin'
                      title={t('Chain')}/>
          </AssetLine>
          <AssetLine>
            <Free
              asset={t('DEX Reserved')}
              free={isApiReady ? (assetsInfo ? reservedDexSpot : '') : defaultXbtcValue?.reservedDexSpotBalance}
              precision={8}
            />
          </AssetLine>
        </div>
        <div>
          <AssetLine>
            <Free
              asset={t('Withdrawal Reserved')}
              free={isApiReady ? (assetsInfo ? reservedWithdrawal : '') : defaultXbtcValue?.reservedWithdrawalBalance}
              precision={8}
            />
          </AssetLine>
          <AssetLine>
            <Free
              asset={t('Total')}
              free={isApiReady ? (assetsInfo ? allBalance : '') : defaultXbtcValue?.allBalance}
              precision={8}
            />
          </AssetLine>
        </div>
      </AssetDetail>
    </div>
  );
}
