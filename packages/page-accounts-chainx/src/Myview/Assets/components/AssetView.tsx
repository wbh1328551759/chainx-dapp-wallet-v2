import { AssetsInfo } from '@polkadot/react-hooks-chainx/types';
import React from 'react';
import styled from 'styled-components';
import Free from './Free';
import Frees from './Frees';
import InfoView from './InfoView';
import { useTranslation } from '@polkadot/app-accounts/translate';
import BN from 'bn.js';


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

export default function ({ assetsInfo }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const usable = new BN(assetsInfo?.Usable)
  const reservedDexSpot = new BN(assetsInfo?.ReservedDexSpot)
  const reservedWithdrawal = new BN(assetsInfo?.ReservedWithdrawal)

  const allBalance = usable.add(reservedDexSpot).add(reservedWithdrawal)
  return (
    <div>
      <AssetLine>
        <Frees
          asset='Balance'
          free={assetsInfo?.Usable ? usable : ''}
          precision={8}
        />
      </AssetLine>
      <AssetDetail>
        <div>
          <AssetLine>
            <InfoView info='Bitcoin'
              title={t('Chain')} />
          </AssetLine>
          <AssetLine>
            <Free
              asset={t('DEX Reserved')}
              free={assetsInfo ? reservedDexSpot : ''}
              precision={8}
            />
          </AssetLine>
        </div>
        <div>
          <AssetLine>
            <Free
              asset={t('Withdrawal Reserved')}
              free={assetsInfo ? reservedWithdrawal : ''}
              precision={8}
            />
          </AssetLine>
          <AssetLine>
            <Free
              asset={t('Total')}
              free={assetsInfo ? allBalance : ''}
              precision={8}
            />
          </AssetLine>
        </div>
      </AssetDetail>
    </div>
  );
}
