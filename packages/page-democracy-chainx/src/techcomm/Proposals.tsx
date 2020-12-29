import React from 'react';
import ProposalsFC from '@polkadot/app-tech-comm/Proposals';
import {useApi, useCall, useMembers} from '@polkadot/react-hooks';
import {AccountId, Hash} from '@polkadot/types/interfaces';
import {Option} from '@polkadot/types';

const transformPrime = {
  transform: (result: Option<AccountId>): AccountId | null => result.unwrapOr(null)
};
function Proposals(){
  const { api } = useApi();
  const { isMember, members } = useMembers('technicalCommittee');
  const prime = useCall<AccountId | null>(api.query.technicalCommittee.prime, undefined, transformPrime) || null;
  const proposals = useCall<Hash[]>(api.query.technicalCommittee.proposals);

  return (
    <ProposalsFC
      isMember={isMember}
      members={members}
      prime={prime}
      proposals={proposals}
    />
  )
}

export default Proposals
