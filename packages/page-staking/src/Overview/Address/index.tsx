// Copyright 2017-2020 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveAccountInfo } from '@polkadot/api-derive/types';
import type { Option } from '@polkadot/types';
import type { Balance, EraIndex, SlashingSpans, ValidatorPrefs } from '@polkadot/types/interfaces';
import type { ValidatorInfo } from '../../types';

import BN from 'bn.js';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { ApiPromise } from '@polkadot/api';
import { Icon, LinkExternal, Badge, Button } from '@polkadot/react-components';
import { AddressSmall } from '@polkadot/react-components-chainx';
import { checkVisibility } from '@polkadot/react-components/util';
import { useApi, useCall, useToggle } from '@polkadot/react-hooks';
import { FormatBalance } from '@polkadot/react-query';
import { useTranslation } from '../../translate';

import Favorite from './Favorite';
import Voter from '../../models/vote'
import PopMenu from '../../models'
import NominatedBy from './NominatedBy';
import Status from './Status';
import StakeOther from './StakeOther';
import BigNumber from 'bignumber.js';
import {toPrecision} from '@polkadot/app-accounts-chainx/Myview/toPrecision';

interface Props {
  address: string;
  className?: string;
  filterName: string;
  hasQueries: boolean;
  isElected: boolean;
  isFavorite: boolean;
  isMain?: boolean;
  lastBlock?: string;
  nominatedBy?: [string, EraIndex, number][];
  onlineCount?: false | BN;
  onlineMessage?: boolean;
  points?: string;
  toggleFavorite: (accountId: string) => void;
  validatorInfo?: ValidatorInfo;
  withIdentity: boolean;
}

interface StakingState {
  commission?: string;
  nominators: [string, Balance][];
  stakeTotal?: BN;
  stakeOther?: BN;
  stakeOwn?: BN;
}


const transformSlashes = {
  transform: (opt: Option<SlashingSpans>) => opt.unwrapOr(null)
};

function useAddressCalls(api: ApiPromise, address: string, isMain?: boolean) {
  const params = useMemo(() => [address], [address]);
  const accountInfo = useCall<DeriveAccountInfo>(api.derive.accounts.info, params);
  const slashingSpans = useCall<SlashingSpans | null>(!isMain && api.query.staking.slashingSpans, params, transformSlashes);

  return { accountInfo, slashingSpans };
}

function Address({ address, className = '', filterName, hasQueries, isElected, isFavorite, isMain, lastBlock, nominatedBy, onlineCount, onlineMessage, points, toggleFavorite, validatorInfo, withIdentity }: Props): React.ReactElement<Props> | null {
  const { api } = useApi();
  const { accountInfo } = useAddressCalls(api, address, isMain);
  const [isToggleVote, toggleVote] = useToggle();
  const { t } = useTranslation();
  const [remainingVotesData, setRemainingVotesData] = useState<string>('')

  useEffect(() => {
    async function getxxx(){
      const upperVotes = await api.query.xStaking.upperBoundFactorOfAcceptableVotes()
      const upperVotesData = JSON.parse(upperVotes)

      if(validatorInfo){
        const ownVotes: BigNumber = new BigNumber(validatorInfo.selfBonded)
        const totalVotes: BigNumber = new BigNumber(validatorInfo.totalNomination)
        const bgResult: BigNumber = new BigNumber(toPrecision(ownVotes.toNumber() * upperVotesData - totalVotes.toNumber(), 8))
        const result: string = bgResult.toNumber().toFixed(4)
        setRemainingVotesData(result)
      }
    }

    getxxx()
  }, [validatorInfo])


  const isVisible = useMemo(
    () => accountInfo ? checkVisibility(api, address, accountInfo, filterName, withIdentity) : true,
    [api, accountInfo, address, filterName, withIdentity]
  );

  const _onQueryStats = useCallback(
    (): void => {
      window.location.hash = `/staking/query/${address}`;
    },
    [address]
  );

  if (!isVisible) {
    return null;
  }

  return (
    <tr className={className}>
      <td className='badge together'>
        <Favorite
          address={address}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
        {/* <Status
          isElected={isElected}
          isMain={isMain}
          nominators={nominatedBy || nominators}
          onlineCount={onlineCount}
          onlineMessage={onlineMessage}
        /> */}
      </td>
      <td className='address'>
        <AddressSmall value={address} />
      </td>

      <td className='highlight--color'>

        {
          JSON.stringify(validatorInfo?.isValidating) === 'true' ? (<span>
            <Badge
              color='green'
              icon='chevron-right'
            />
            {t<string>('Validator')}
          </span>) :
            (JSON.stringify(validatorInfo?.isChilled) === 'true' ? (<span>
              <Badge
                color='red'
                icon='chevron-right'
              />
              {t<string>('Drop Out')}
            </span>) : (<span>
              <Badge
                color='blue'
                icon='chevron-right'
              />
              {t<string>('Candidate')}
            </span>))
        }
      </td>

      {isMain && (
        <td className='number '>
          { (
            <FormatBalance value={validatorInfo?.totalNomination} />
          )}
        </td>
      )}

      {isMain && (
        <td className='number'>
          { (
            <FormatBalance value={validatorInfo?.selfBonded} />
          )}
        </td>
      )}

      {isMain && (
        <td className='number'>
          { (
            <FormatBalance value={validatorInfo?.rewardPotBalance} />
          )}
        </td>
      )}


      {isMain && (
        <>
          {/* <td className='number'>
            {points}
          </td> */}
          <td className='number'>
            {lastBlock}

          </td>

        </>
      )}
      <td>
        {isToggleVote && (
          <Voter
            onClose={toggleVote}
            validatorId={validatorInfo?.account + ''}
            onSuccess={() => { }}
            remainingVotesData={remainingVotesData}
          />
        )}
          <Button
            icon='sign-in-alt'
            label={t<string>('Vote')}
            onClick={toggleVote}
          />
      </td>
        {/* <PopMenu validatorInfo={validatorInfo} /> */}
    </tr>
  );
}

export default React.memo(Address);
