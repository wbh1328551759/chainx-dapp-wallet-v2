// Copyright 2017-2020 @polkadot/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, {useMemo} from 'react';
import {Route, Switch} from 'react-router';
import {HelpOverlay} from '@polkadot/react-components';
import {Tabs} from '@polkadot/react-components-chainx';
import basicMd from './md/basic.md';
import Execute from './Execute';
import useDispatchCounter from './Execute/useCounter';
import Council from '@polkadot/app-council/Overview';
import Overview from './Overview';
import {useTranslation} from './translate';
import Trustee from '../../page-trust/src/components/Block';
import {useLocation} from 'react-router-dom';
import {useApi, useCall} from '@polkadot/react-hooks';
import {AccountId} from '@polkadot/types/interfaces';
import {Option} from '@polkadot/types';

export {default as useCounter} from './useCounter';

interface Props {
  basePath: string;
}

const transformPrime = {
  transform: (result: Option<AccountId>): AccountId | null => result.unwrapOr(null)
};

function DemocracyApp({basePath}: Props): React.ReactElement<Props> {
  const {t} = useTranslation();
  const { api } = useApi();

  const dispatchCount = useDispatchCounter();
  const { pathname } = useLocation();
  const prime = useCall<AccountId | null>(api.query.council.prime, undefined, transformPrime) || null;

  const items = useMemo(() => [
    {
      isRoot: true,
      name: 'overview',
      text: t<string>('Democracy overview')
    },
    {
      name: 'council',
      text: t<string>('Council')
    },
    {
      name: 'treasury',
      text: t<string>('Treasury')
    },
    {
      name: 'technicalCommittee',
      text: t<string>('Technical Committee')
    },
    {
      name: 'trustee',
      text: t<string>('Trustee')
    }
  ], [dispatchCount, t]);

  return (
    <main className='democracy--App'>
      <HelpOverlay md={basicMd as string}/>
      <header>
        <Tabs
          basePath={basePath}
          items={items}
        />
      </header>
      <Switch>
        <Route path={`${basePath}/council`}>
          <Council
            className={[basePath, `${basePath}/candidates`].includes(pathname) ? '' : 'council--hidden'}
            prime={prime}
          />
        </Route>
        <Route path={`${basePath}/trustee`}>
          <Trustee/>
        </Route>

        <Route><Overview/></Route>
      </Switch>
    </main>
  );
}

export default React.memo(DemocracyApp);
