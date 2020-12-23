// Copyright 2017-2020 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AppProps as Props } from '@polkadot/react-components/types';

import React, {useContext, useRef} from 'react';
import { Route, Switch } from 'react-router';
import {useAccounts, useApi, useIpfs} from '@polkadot/react-hooks';
import { Tabs } from '@polkadot/react-components';
import { useTranslation } from './translate';
import useCounter from './useCounter';
import Myview from './Myview';
import styled from 'styled-components';
import NoAccount from './Myview/NoAccount';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';

export { useCounter };

const HIDDEN_ACC = ['vanity'];

const Main = styled.main`
  > header{
    margin-bottom: 16px;
  }
  > div{
    margin:0 16px;
    padding-top: 0;
    width: 100%;
  }
`;

function AccountsApp({ basePath, onStatusChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { isIpfs } = useIpfs();
  const {currentAccount} = useContext(AccountContext)

  const itemsRef = useRef([
    {
      isRoot: true,
      name: 'overview',
      text: t('My accounts')
    }
  ]);

  return (
    <Main className='accounts--App'>

      <header>
        {/*<Tabs*/}
        {/*  basePath={basePath}*/}
        {/*  hidden={(!isIpfs) ? undefined : HIDDEN_ACC}*/}
        {/*  items={itemsRef.current}*/}
        {/*/>*/}
      </header>
      <Switch>
        <Route>
          {currentAccount ? <Myview
            basePath={basePath}
            onStatusChange={onStatusChange}
          />: <NoAccount onStatusChange={onStatusChange}/>}
        </Route>
      </Switch>
    </Main>
  );
}

export default React.memo(AccountsApp);
