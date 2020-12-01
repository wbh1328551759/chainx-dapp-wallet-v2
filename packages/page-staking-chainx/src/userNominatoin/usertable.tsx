
import React, { useEffect, useState } from 'react';
import { AddressMini, Button, Menu, Popup } from '@polkadot/react-components';
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

interface Props {
  accountId?: string;
  allNomination?: Nomination[],
  userInfo?: UserInterest[];
  onStausChange?: TxCallback;
}

interface State {
  interestNum: number;
  totalVoteNum: number;
  freezeNum: number;
  voters: string[];
  voteAmouts: string[];
  interests: string[];
  options: KeyringSectionOption[];
  rebondOptions: KeyringSectionOption[];
  boundChunks: number[];
  redeemOptions: object[];

}

function UserTable({ accountId, allNomination, userInfo, onStausChange }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();

  const [isVoteOpen, toggleVote] = useToggle();

  const [isRebackOpen, toggleReback] = useToggle();
  const [isBoundOpen, toggleUnbound] = useToggle();
  const [isReBoundOpen, toggleRebound] = useToggle();

  const [isClaim, toggleClaim] = useToggle();

  const [{ boundChunks, freezeNum, interestNum,
    interests, options, redeemOptions, totalVoteNum, voteAmouts, voters, rebondOptions }, setState] = useState<State>({
      interestNum: 0,
      totalVoteNum: 0,
      freezeNum: 0,
      voters: [],
      voteAmouts: [],
      interests: [],
      options: [],
      boundChunks: [],
      redeemOptions: [],
      rebondOptions: []
    });

  const myNomination: Nomination[] | undefined = allNomination?.filter((item) => item.account === accountId);


  useEffect((): void => {
    let interestNum = 0;
    let totalVoteNum = 0;
    let freezeNum = 0;
    const voters: string[] = [];
    const voteAmouts: string[] = [];
    const interests: string[] = [];
    const options: KeyringSectionOption[] = [];
    const redeemOptions: object[] = [];

    const boundChunks: number[] = [];

    myNomination?.forEach((item) => {
      const voteinfo = userInfo?.find((voteitem) => voteitem.account === item.account);

      const interestinfo = voteinfo?.interests.find((interestItem) => interestItem.validator === item.validatorId);

      interests.push(interestinfo?.interest ? interestinfo?.interest : '0');

      voters.push(item.validatorId);
      voteAmouts.push(item.nomination);

      const chunkes = item.unbondedChunks ? item.unbondedChunks.reduce((total, record) => {
        return total + Number(record.value);
      }, 0) : 0;

      boundChunks.push(chunkes);

      options.push(
        {
          key: item.validatorId,
          name: item.validatorId,
          value: item.validatorId
        }
      );
      const currentValidatorId = item.validatorId;

      item.unbondedChunks ? item.unbondedChunks.map((item, index) => {
        redeemOptions.push({
          validatorId: currentValidatorId,
          text: 'locked until:' + item.lockedUntil,
          value: index + ''
        });
      }) : {};
      interestNum += Number(interestinfo?.interest ? interestinfo?.interest : '0');
      totalVoteNum += Number(item.nomination);
    });
    freezeNum = boundChunks.reduce((prev, curr) => {
      return prev + curr;
    });

    setState({
      freezeNum: freezeNum,
      interestNum: interestNum,
      totalVoteNum: totalVoteNum,
      voters: voters,
      voteAmouts: voteAmouts,
      interests: interests,
      options: options,
      boundChunks: boundChunks,
      redeemOptions: redeemOptions,
      rebondOptions: []
    });
  }, myNomination);


  return (
    <tr>
      {
        voters.map((who, index): React.ReactNode =>
          <tr>
            <td>
              <AddressMini
                key={who.toString()}
                value={who}
                withLockedVote
              />
              <Button
                icon='paper-plane'
                label={t<string>('Vote')}
                onClick={toggleVote}
              />
              <Button
                icon='paper-plane'
                label={t<string>('ReBound')}
                onClick={toggleRebound}
              />
            </td>

            <td>
              {t<string>('Number of votes')}:<FormatBalance value={(voteAmouts?.[index])}></FormatBalance>
            </td>
            <td>
              {t<string>('Number of Interests')} :<FormatBalance value={(interests?.[index])}></FormatBalance>
            </td>
            <td>
              {t<string>('Freeze')} :<FormatBalance value={(boundChunks?.[index])}></FormatBalance>
            </td>
            <tr>
              <td className='button' key="claim">
                {
                  isClaim && (
                    <Claim
                      account={accountId}
                      onClose={toggleClaim}
                      options={options}
                      value={who}
                      onSuccess={onStausChange}
                    />
                  )
                }
                {isVoteOpen && (
                  <Vote
                    account={accountId}
                    key="vote"
                    onClose={toggleVote}
                    options={options}
                    value={voters[0]}
                    onSuccess={onStausChange}
                  />
                )}

                {
                  isRebackOpen && (
                    <Reback
                      account={accountId}
                      onClose={toggleReback}
                      options={options}
                      redeemOptions={redeemOptions}
                      key="reback"
                      onSuccess={onStausChange}
                      value={voters[0]}
                    />
                  )
                }
                {
                  isBoundOpen && (
                    <UnBound
                      account={accountId}
                      onClose={toggleUnbound}
                      onSuccess={onStausChange}
                      options={options}
                      key="unbond"
                      value={voters[0]}
                    />
                  )
                }

                {
                  isReBoundOpen && (
                    <ReBond
                      account={accountId}
                      onClose={toggleRebound}
                      options={options}
                      value={voters[0]}
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

                {
                  redeemOptions.length > 0 ? (
                    <Button
                      icon='paper-plane'
                      label={t<string>('Redemption')}
                      onClick={toggleReback}
                    />
                  ) : null
                }

              </td>
            </tr>
          </tr>)
      }
    </tr>

  );
}

export default React.memo(UserTable);
