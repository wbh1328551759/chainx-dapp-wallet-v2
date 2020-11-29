// Copyright 2017-2020 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useRef } from 'react';
import OverView from './OverView';
import { AppProps as Props } from '@polkadot/react-components/types';
// Copyright 2017-2020 @polkadot/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useAccounts } from '@polkadot/react-hooks';
import { Route, Switch } from 'react-router';
import { Tabs } from '@polkadot/react-components';
import AccountSelect from '@polkadot/react-components-chainx/AccountSelect';
import { useTranslation } from './translate';
import UserNomination from './userNominatoin';

function SlakingApp({ basePath, onStatusChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { allAccounts } = useAccounts();


  useEffect(() => {
    // if (isNotBlankAndEmptyObject(storedValue)) {
    //   setAccountName(storedValue)
    // }
  }, [allAccounts]);

  const itemsRef = useRef([
    {
      isRoot: true,
      name: 'overview',
      text: t<string>('Staking Overview')
    },
    {

      name: 'nomination',
      text: t<string>('My Staking')
    }
  ]);

  return (
    <main>

      <header>
        <Tabs
          basePath={basePath}
          items={itemsRef.current}
        />
        <AccountSelect />
      </header>

      <Switch>
        <Route path={`${basePath}/nomination`}>
          <UserNomination
            basePath={basePath}
            onStatusChange={onStatusChange}
          />
        </Route>
        <Route
          basePath={basePath}
          component={OverView}
        />

      </Switch>

    </main>
  );
}

export default React.memo(SlakingApp);
