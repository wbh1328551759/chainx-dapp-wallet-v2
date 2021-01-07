// Copyright 2017-2020 @polkadot/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveCouncilVotes, DeriveElectionsInfo } from '@polkadot/api-derive/types';
import type { AccountId, BlockNumber } from '@polkadot/types/interfaces';

import React from 'react';
import { Button } from '@polkadot/react-components';
import { useApi, useCall } from '@polkadot/react-hooks';
import styled from 'styled-components';
import Candidates from './Candidates';
import Members from './Members';
import SubmitCandidacy from './SubmitCandidacy';
import Summary from './Summary';
import Vote from './Vote';

const Wrapper = styled.div`
  .memberscroll, .candidatescroll, .candidatescrolls {
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

interface Props {
  className?: string;
  prime: AccountId | null;
}

const transformVotes = {
  transform: (entries: DeriveCouncilVotes): Record<string, AccountId[]> => {
    return entries.reduce((result: Record<string, AccountId[]>, [voter, { votes }]): Record<string, AccountId[]> => {
      votes.forEach((candidate): void => {
        const address = candidate.toString();

        if (!result[address]) {
          result[address] = [];
        }

        result[address].push(voter);
      });

      return result;
    }, {});
  }
};

function Overview ({ className = '', prime }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const bestNumber = useCall<BlockNumber>(api.derive.chain.bestNumber);
  const electionsInfo = useCall<DeriveElectionsInfo>(api.derive.elections.info);
  const allVotes = useCall<Record<string, AccountId[]>>(api.derive.council.votes, undefined, transformVotes);

  return (
    <Wrapper className={className}>
      <Summary
        bestNumber={bestNumber}
        electionsInfo={electionsInfo}
      />
      <Button.Group>
        <Vote electionsInfo={electionsInfo} />
        <SubmitCandidacy electionsInfo={electionsInfo} />
      </Button.Group>
      <Members className="memberscroll"
        allVotes={allVotes}
        electionsInfo={electionsInfo}
        prime={prime}
      />
      <Candidates 
        allVotes={allVotes}
        electionsInfo={electionsInfo}
      />
    </Wrapper>
  );
}

export default React.memo(Overview);
