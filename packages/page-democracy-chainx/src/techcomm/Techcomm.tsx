import React from 'react';
import Overview from '@polkadot/app-tech-comm/Overview'
import {useApi, useCall, useMembers} from '@polkadot/react-hooks';
import {AccountId, Hash} from '@polkadot/types/interfaces';
import {Option} from '@polkadot/types';

const transformPrime = {
  transform: (result: Option<AccountId>): AccountId | null => result.unwrapOr(null)
};

function Techcomm(){
  const { api } = useApi();
  const { isMember, members } = useMembers('technicalCommittee');
  const proposals = useCall<Hash[]>(api.query.technicalCommittee.proposals);
  const prime = useCall<AccountId | null>(api.query.technicalCommittee.prime, undefined, transformPrime) || null;

  return (
    <Overview
      isMember={isMember}
      members={members}
      prime={prime}
      proposals={proposals}
    />
  )
}

export default Techcomm
