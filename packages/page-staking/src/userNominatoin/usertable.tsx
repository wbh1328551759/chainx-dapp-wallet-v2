
import React, { useEffect, useState } from 'react';
import { AddressMini, Button } from '@polkadot/react-components';
import Vote from './vote';
import { useToggle } from '@polkadot/react-hooks';
import { KeyringSectionOption } from '@polkadot/ui-keyring/options/types';
import { Nomination, UserInterest } from '@polkadot/react-hooks-chainx/types';
import { FormatBalance } from '@polkadot/react-query';
import Reback from './reback';
import UnBound from './unbond';
import ReBond from './rebond'

import Claim from './claim';
import { useTranslation } from '../translate';
import { TxCallback } from '@polkadot/react-components/Status/types';
import { ValidatorInfo } from '../types';

interface Props {
  accountId?: string;
  nomination?: Nomination,
  userInterest?: string;
  onStausChange?: TxCallback;
  validatorInfoList: ValidatorInfo[];
}



function UserTable({ accountId, nomination, userInterest, onStausChange, validatorInfoList }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const [isVoteOpen, toggleVote] = useToggle();

  const [isRebackOpen, toggleReback] = useToggle();
  const [isBoundOpen, toggleUnbound] = useToggle();
  const [isReBoundOpen, toggleRebound] = useToggle();

  const [isClaim, toggleClaim] = useToggle();

  const chunkes = nomination?.unbondedChunks ? nomination.unbondedChunks.reduce((total, record) => {
    return total + Number(record.value);
  }, 0) : 0;

  console.log(JSON.stringify(userInterest))
  const redeemOptions: object[] = [];

  nomination?.unbondedChunks ? nomination?.unbondedChunks.map((item, index) => {
    redeemOptions.push({
      validatorId: nomination.validatorId,
      text: 'locked until:' + item.lockedUntil,
      value: index + ''
    });
  }) : {};


  return (
    <tr>
      <td>
        <AddressMini
          key={nomination?.validatorId}
          value={nomination?.validatorId}
          withLockedVote
        />
      </td>

      <td>
        {t<string>('Number of votes')}:<FormatBalance value={nomination?.nomination}></FormatBalance>
      </td>
      <td>
        {t<string>('Number of Interests')} :<FormatBalance value={userInterest}></FormatBalance>
      </td>
      <td>
        {t<string>('Freeze')} :<FormatBalance value={chunkes}></FormatBalance>
      </td>
      <tr>
        <td className='button' key="claim">
          {
            isClaim && (
              <Claim
                account={accountId}
                onClose={toggleClaim}

                value={nomination?.validatorId}
                onSuccess={onStausChange}
              />
            )
          }
          {isVoteOpen && (
            <Vote
              account={accountId}
              key="vote"
              onClose={toggleVote}


              value={nomination?.validatorId}
              onSuccess={onStausChange}
            />
          )}

          {
            isRebackOpen && (
              <Reback
                account={accountId}
                onClose={toggleReback}

                redeemOptions={redeemOptions}
                key="reback"
                onSuccess={onStausChange}
                value={nomination?.validatorId}
              />
            )
          }
          {
            isBoundOpen && (
              <UnBound
                account={accountId}
                onClose={toggleUnbound}
                onSuccess={onStausChange}
                key="unbond"
                value={nomination?.validatorId}
              />
            )
          }

          {
            isReBoundOpen && (
              <ReBond
                account={accountId}
                onClose={toggleRebound}
                validatorInfoList={validatorInfoList}
                value={nomination?.validatorId}
                onSuccess={onStausChange}
              />
            )
          }

          <Button
            icon='paper-plane'
            label={t<string>('Vote')}
            onClick={toggleVote}
          />
          <Button
            icon='paper-plane'
            label={t<string>('Claim Interest')}
            onClick={toggleClaim}
          />
          <Button
            icon='paper-plane'
            label={t<string>('UnBound')}
            onClick={toggleUnbound}
          />
          <Button
            icon='paper-plane'
            label={t<string>('ReBound')}
            onClick={toggleRebound}
          />
          {
            Number(chunkes) > 0 ? (
              <Button
                icon='paper-plane'
                label={t<string>('Redemption')}
                onClick={toggleReback}
              />
            ) : null
          }
        </td>
      </tr>
    </tr>
  )


};


export default React.memo(UserTable);
