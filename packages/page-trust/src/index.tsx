// Copyright 2017-2020 @polkadot/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AppProps as Props } from '@polkadot/react-components/types';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { Tabs } from '@polkadot/react-components';
import Block from './components/Block';
import { Route, Switch } from 'react-router';
import { useTranslation } from './translate';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  padding: 0;
`;

const Main = styled.div`
  height: 100%;
  flex: 1 1 0;
  padding-top: 16px;
  min-width: 1280px;
  max-width: 1440px;
  margin-left: 80px;
  margin-right: 80px;
`;

function TrustApp ({ basePath, onStatusChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const itemsRef = useRef([
    {
      isRoot: true,
      name: 'overview',
      text: t('Withdrawals')
    }
  ]);

  return (
    <Wrapper>
      <header>
        <Tabs
          basePath={basePath}
          items={itemsRef.current}
        />
      </header>
      <Switch>
        <Route path={`${basePath}/`}>
          <Main>
            <Block />
          </Main>
        </Route>
      </Switch>
    </Wrapper>
  );
}

export default React.memo(TrustApp);
