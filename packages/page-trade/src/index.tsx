// Copyright 2017-2020 @polkadot/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {AppProps as Props} from '@polkadot/react-components/types';
import React, {useRef, useState, useContext} from 'react';
import {Tabs} from '@polkadot/react-components';
import {Route, Switch} from 'react-router';
import Wrapper from './Wrapper';
import Trade from './Module';
import Orders from './Orders';
import {useTranslation} from './translate';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';
import {DexProvider} from '@polkadot/react-components-chainx/DexProvider';

function TradeApp({basePath}: Props): React.ReactElement<Props> {
  const {t} = useTranslation();
  const [, setNodeName] = useState<string>('');
  const {currentAccount} = useContext(AccountContext);

  const itemsRef = useRef([
    {
      isRoot: true,
      name: 'overview',
      text: t('Currency trade')
    }
  ]);

  return (
    <Wrapper>
      <header>
        <>
          <Tabs
            basePath={basePath}
            items={itemsRef.current}
          />
        </>
      </header>
      <Switch>
        <Route path={`${basePath}/`}>
          <DexProvider>
            <Wrapper>
              <Trade nodeName={currentAccount}
                     setNodeName={setNodeName}/>
              <Orders nodeName={currentAccount}/>
            </Wrapper>
          </DexProvider>
        </Route>
      </Switch>
    </Wrapper>
  );
}

export default React.memo(TradeApp);
