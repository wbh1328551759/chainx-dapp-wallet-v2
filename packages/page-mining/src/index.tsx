import { AppProps as Props } from '@polkadot/react-components/types';
import React, { useRef } from 'react';
import { Tabs } from '@polkadot/react-components';
import { Route, Switch } from 'react-router';
import CrossChainMining from './components/CrossChainMining';
import MyCrossChainAssets from './components/MyCrossChainAssets';
import { useTranslation } from './translate';

function MiningApp({ basePath, onStatusChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const itemsRef = useRef([
    {
      isRoot: true,
      name: 'state',
      text: t('State')
    }
    // {
    //   name: 'MyCrossChainAssets',
    //   text: t('My cross-chain asset')
    // }
  ]);

  return (
    <main>
      <header>
        <Tabs
          basePath={basePath}
          items={itemsRef.current}
        />
      </header>
      <Switch>
        <Route path={`${basePath}/MyCrossChainAssets`}>
          <MyCrossChainAssets />
        </Route>
        <Route path={`${basePath}/`}>
          <CrossChainMining />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(MiningApp);
