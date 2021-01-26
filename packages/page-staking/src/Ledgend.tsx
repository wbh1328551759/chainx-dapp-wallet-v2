// Copyright 2017-2020 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { Badge, Icon } from '@polkadot/react-components';

import { useTranslation } from './translate';

interface Props {
  className?: string;
}

function Ledgend({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <span>
        <Badge
          color='blue'
          icon='chevron-right'
        />
        {t('Next Session')}
      </span>
      <span>
        <Badge
          color='green'
          info='5'
        />
        {t('Produced Blocks')}
      </span>
      <span>
        <Badge
          color='green'
          info={<Icon icon='envelope' />}
        />
        {t('Online Message')}
      </span>
      <span>
        <Badge
          color='green'
          icon='hand-paper'
        />
        {t('Nominating')}
      </span>
    </div>
  );
}

export default React.memo(styled(Ledgend)`
  font-size: 0.85rem;
  padding: 1rem 0.5rem 0.5rem;
  text-align: center;

  .ui--Badge {
    margin-right: 0.5rem;
  }

  span+span {
    margin-left: 1rem;
  }
`);
