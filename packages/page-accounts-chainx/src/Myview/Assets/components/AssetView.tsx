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
      width: 80%;
    }
  }
  @media screen and (max-width:767px) {
    div {
      flex-direction: column;
      width: 100%;
      div {
        width: 100%;
      }
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
  usableBalance: string,
  reservedDexSpotBalance: string,
  reservedWithdrawalBalance: string,
  allBalance: string
}

export default function ({assetsInfo}: Props): React.ReactElement<Props> {
  const {isApiReady} = useApi();

  const {t} = useTranslation();
  const currentAccount = useContext(AccountContext);

  const [usable, setUsable] = useState<number>(0)
  const [reservedDexSpot, setReservedDexSpot] = useState<number>(0)
  const [reservedWithdrawal, setReservedWithdrawal] = useState<number>(0)
  const [allBalance, setAllBalance] = useState<number>(0)
  // const reservedDexSpot = new BN(assetsInfo?.ReservedDexSpot);
  // const reservedWithdrawal = new BN(assetsInfo?.ReservedWithdrawal);
  // const allBalance = usable.add(reservedDexSpot).add(reservedWithdrawal);

  const defaultValue = JSON.parse(window.localStorage.getItem('xbtcInfo')) || {
    usableBalance: 0,
    reservedDexSpotBalance: 0,
    reservedWithdrawalBalance: 0,
    allBalance: 0
  }
  const [defaultXbtc, setDefaultXbtc] = useState<AssetsInfo>(defaultValue)

  const [defaultXbtcValue, setDefaultXbtcValue] = useState<XbtcFreeInfo>({
    usableBalance: defaultValue.usableBalance,
    reservedDexSpotBalance: defaultValue.reservedDexSpotBalance,
    reservedWithdrawalBalance: defaultValue.reservedWithdrawalBalance,
    allBalance: defaultValue.allBalance
  });

  useEffect(() => {
    setDefaultXbtc(defaultValue);
    if (defaultXbtc) {
      setDefaultXbtcValue({
        usableBalance: defaultXbtc.Usable,
        reservedDexSpotBalance: defaultXbtc.ReservedDexSpot,
        reservedWithdrawalBalance: defaultXbtc.ReservedWithdrawal,
        allBalance: new BN(defaultXbtc.ReservedDexSpot).add(new BN(defaultXbtc.ReservedWithdrawal)).add(new BN(defaultXbtc.Usable))
      });
    }

  }, [currentAccount, isApiReady, assetsInfo]);

  useEffect(() => {
    if(isApiReady && assetsInfo){
      setUsable((new BN(assetsInfo.Usable)).toNumber())
      setReservedDexSpot((new BN(assetsInfo.ReservedDexSpot)).toNumber())
      setReservedWithdrawal((new BN(assetsInfo.ReservedWithdrawal)).toNumber())
      setAllBalance(
        (new BN(assetsInfo.Usable)).add(
          (new BN(assetsInfo.ReservedDexSpot))).add(
          (new BN(assetsInfo.ReservedWithdrawal)
          )
        ).toNumber()
      )

    }else{
      setUsable((new BN(defaultXbtcValue.usableBalance)).toNumber())
      setReservedDexSpot((new BN(defaultXbtcValue.reservedDexSpotBalance)).toNumber())
      setReservedWithdrawal((new BN(defaultXbtcValue.reservedWithdrawalBalance)).toNumber())
      setAllBalance(
        (new BN(defaultXbtcValue.usableBalance)).add(
          (new BN(defaultXbtcValue.reservedDexSpotBalance))).add(
          (new BN(defaultXbtcValue.reservedWithdrawalBalance)
          )
        ).toNumber()
      )
    }
  }, [defaultValue, isApiReady, assetsInfo])

  return (
    <div>
      <AssetLine>
        <Frees
          asset='Balance'
          free={usable}
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
              free={reservedDexSpot}
              precision={8}
            />
          </AssetLine>
        </div>
        <div>
          <AssetLine>
            <Free
              asset={t('Withdrawal Reserved')}
              free={reservedWithdrawal}
              precision={8}
            />
          </AssetLine>
          <AssetLine>
            <Free
              asset={t('Total')}
              free={allBalance}
              precision={8}
            />
          </AssetLine>
        </div>
      </AssetDetail>
    </div>
  );
}
