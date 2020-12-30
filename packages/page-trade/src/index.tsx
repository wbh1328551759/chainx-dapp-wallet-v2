// Copyright 2017-2020 @polkadot/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {AppProps as Props} from '@polkadot/react-components/types';
import React from 'react';
import {Route, Switch} from 'react-router';
import Wrapper from './Wrapper';
import Trade from './Module';
import Orders from './Orders';
import {DexProvider} from '@polkadot/react-components-chainx/DexProvider';

function TradeApp({basePath}: Props): React.ReactElement<Props> {

  return (
    <Wrapper>
      <header>

      </header>
      <Switch>
        <Route path={`${basePath}/`}>
          <DexProvider>
            <Wrapper>
              <Trade />
              <Orders />
            </Wrapper>
          </DexProvider>
        </Route>
      </Switch>
    </Wrapper>
  );
}

export default React.memo(TradeApp);
