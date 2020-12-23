// Copyright 2017-2020 @polkadot/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, {useMemo} from 'react';
import {Route, Switch} from 'react-router';
import {HelpOverlay} from '@polkadot/react-components';
import {Tabs} from '@polkadot/react-components-chainx';
import basicMd from './md/basic.md';
import Execute from './Execute';
// import Council from '@polkadot/app-council';
import useDispatchCounter from './Execute/useCounter';
import Overview from './Overview';
import {useTranslation} from './translate';
import Trustee from '../../page-trust/src/components/Block';
import styled from 'styled-components';

export {default as useCounter} from './useCounter';

interface Props {
  basePath: string;
}



function DemocracyApp({basePath}: Props): React.ReactElement<Props> {
  const {t} = useTranslation();
  const dispatchCount = useDispatchCounter();

  const items = useMemo(() => [
    {
      isRoot: true,
      name: 'overview',
      text: t<string>('Democracy overview')
    },
    {
      // isRoot: true,
      name: 'trustee',
      text: t<string>('资产信托')
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
        <Route path={`${basePath}/trustee`}>
          {/*<Execute />*/}
          {/*<Council/>*/}

            <Trustee/>

        </Route>
        <Route><Overview/></Route>
      </Switch>
    </main>
  );
}

export default React.memo(DemocracyApp);
