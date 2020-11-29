
import React from 'react';
import Wrapper from './Wrapper';
import Buy from './Buy';
import Sell from './Sell';
import ReactTooltip from 'react-tooltip';
import { useAccounts } from '@polkadot/react-hooks';
import { useAccountAssets } from '@polkadot/react-hooks-chainx';

export default function ({ nodeName, setNodeName }: NodeNameProps): React.ReactElement<NodeNameProps> {
  const { allAccounts } = useAccounts();
  const { allAssets } = useAccountAssets(allAccounts);

  return (
    <Wrapper>
      <Buy
        assetsInfo={allAssets && allAssets.length > 0 ? allAssets?.find(
          (assets) => assets.account === nodeName
        ) : undefined}
        nodeName={nodeName}
        setNodeName={setNodeName}
      />
      <Sell assetsInfo={allAssets && allAssets.length > 0 ? allAssets.find(
        (assets) => assets.account === nodeName
      ) : undefined}
        nodeName={nodeName}
        setNodeName={setNodeName}
      />
      <ReactTooltip effect='solid'
        place='top'
        type='dark' />
    </Wrapper>
  );
}
