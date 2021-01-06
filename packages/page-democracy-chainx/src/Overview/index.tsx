// Copyright 2017-2020 @polkadot/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveReferendumExt } from '@polkadot/api-derive/types';

import React from 'react';
import { Button } from '@polkadot/react-components';
import { useApi, useCall, useToggle } from '@polkadot/react-hooks';
import styled from 'styled-components';
import { useTranslation } from '../translate';
import Externals from './Externals';
import Proposals from './Proposals';
import Referendums from './Referendums';
import Summary from './Summary';
import PreImage from './PreImage';
import Propose from './Propose';

const Wrapper = styled.div`
  .referendumscroll, .proposalscroll, .externalscroll {
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

interface Props {
  className?: string;
}

function Overview ({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [isPreimageOpen, togglePreimage] = useToggle();
  const [isProposeOpen, togglePropose] = useToggle();
  const referendums = useCall<DeriveReferendumExt[]>(api.derive.democracy.referendums);

  return (
    <Wrapper className={className}>
      <Summary referendumCount={referendums?.length} />
      <Button.Group>
        <Button
          icon='plus'
          label={t<string>('Submit preimage')}
          onClick={togglePreimage}
        />
        <Button
          icon='plus'
          label={t<string>('Submit proposal')}
          onClick={togglePropose}
        />
      </Button.Group>
      {isPreimageOpen && (
        <PreImage onClose={togglePreimage} />
      )}
      {isProposeOpen && (
        <Propose onClose={togglePropose} />
      )}
      <Referendums referendums={referendums} className="referendumscroll" />
      <Proposals className="proposalscroll" />
      <Externals className="externalscroll" />
    </Wrapper>
  );
}

export default React.memo(Overview);
