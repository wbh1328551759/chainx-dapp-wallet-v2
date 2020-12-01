
import React, {useContext, useEffect, useState} from 'react';
import Wrapper from './Wrapper';
import Buy from './Buy';
import Sell from './Sell';
import ReactTooltip from 'react-tooltip';
import {useAccounts, useApi} from '@polkadot/react-hooks';
import {AssetsInfo} from '@polkadot/react-hooks-chainx/types';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';

export default function ({ nodeName, setNodeName }: NodeNameProps): React.ReactElement<NodeNameProps> {
  const hasAccounts = useAccounts()
  const api = useApi()
  const currentAccount = useContext(AccountContext);
  const [currentAccountInfo, setCurrentAccountInfo] = useState<AssetsInfo>();

  console.log('currentAccount:'+JSON.stringify(currentAccount))
  useEffect((): void => {
    async function getAssets(account: string): Promise<any> {
      const res = await api.api.rpc.xassets.getAssetsByAccount(account);
      let current: AssetsInfo = {
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
      });
      setCurrentAccountInfo(current)

    }
    // getAssets('5TqDq71XesuCt8YFrXz2MqF1QqpJKYrg5LtCte3KWB7oyEBB')
    getAssets(currentAccount.currentAccount)
  }, [currentAccount])

  return (
    <Wrapper>
      <Buy
        assetsInfo={hasAccounts ?currentAccountInfo: undefined}
        nodeName={nodeName}
        setNodeName={setNodeName}
      />
      <Sell nodeName={nodeName}/>
      <ReactTooltip effect='solid'
        place='top'
        type='dark' />
    </Wrapper>
  );
}
