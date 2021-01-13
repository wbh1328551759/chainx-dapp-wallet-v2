// Copyright 2017-2020 @polkadot/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { useApi } from '@polkadot/react-hooks';
import styled from 'styled-components';
import DispatchQueue from './DispatchQueue';
import Scheduler from './Scheduler';

const Wrapper = styled.div`
  .dispatchscroll, .schedulerscroll {
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

interface Props {
  className?: string;
}

function Execute ({ className }: Props): React.ReactElement<Props> {
  const { api } = useApi();

  return (
    <Wrapper className={className}>
      <DispatchQueue className="dispatchscroll" />
      {api.query.scheduler && (
        <Scheduler className="schedulerscroll" />
      )}
    </Wrapper>
  );
}

export default React.memo(Execute);
