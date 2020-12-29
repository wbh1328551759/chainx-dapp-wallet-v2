// Copyright 2017-2020 @polkadot/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {AppProps as Props} from '@polkadot/react-components/types';
import React from 'react';
import styled from 'styled-components';
import Block from './components/Block';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  padding: 0;
`;

function TrustApp({basePath, onStatusChange}: Props): React.ReactElement<Props> {
  return (
    <Wrapper>
      <Block/>
    </Wrapper>
  );
}

export default React.memo(TrustApp);
