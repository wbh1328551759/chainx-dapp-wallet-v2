
import React, { useContext } from 'react';
import { ThemeDef } from '@polkadot/react-components/types';
import { ThemeContext } from 'styled-components';
import { AddressMini, Button, Menu, Popup } from '@polkadot/react-components';

import Voter from '../modals/vote';
import { useToggle } from '@polkadot/react-hooks';
import { useReadChainStorage } from '@polkadot/react-hooks-chainx';
import { ValidatorInfo } from '../../types';
import { createMenuGroup, AddNoDuplicateElements } from '../../util';
import Chill from '../modals/chill';
import Validate from '../modals/validate';


import { useTranslation } from '../../translate';

import { UserInterest } from '@polkadot/react-hooks-chainx/types';
import { TxCallback } from '@polkadot/react-components/Status/types';

interface Props {
  className?: string;
  validatorInfo?: ValidatorInfo,
  userInfo?: UserInterest[],
  validatorNames?: string[],
  onStatusChange?: TxCallback;
}

function isJSON(str: string): boolean {
  try {
    const obj = JSON.parse(str);

    return !!obj && typeof obj === 'object';
  } catch (e) { }

  return false;
}

let validatorNames: string[] = [];

function Nomination({ className = '', userInfo, validatorInfo, onStatusChange }: Props): React.ReactElement<Props> | null {
  const [isSettingsOpen, toggleSettings] = useToggle();
  const [isVoteOpen, toggleVote] = useToggle();
  const { t } = useTranslation();

  const validatorData: string = useReadChainStorage('xStaking', 'validators', validatorInfo?.account);

  // Declare the desire to validate for the origin account.
  const [isValidateOpen, toggleValidate] = useToggle();

  // Declare no desire to validate for the origin account.
  const [isChillOpen, toggleChill] = useToggle();
  const { theme } = useContext<ThemeDef>(ThemeContext);
  // const { interestNum, setInterest } = useState(0);

  let interestNum = 0;

  if (isJSON(validatorData)) {
    validatorNames = AddNoDuplicateElements(validatorNames, JSON.parse(validatorData).referralId);
  }

  userInfo?.map((user) => {
    user.interests.map((interest) => {
      if (interest.validator === validatorInfo?.account) {
        interestNum = interestNum + Number(interest.interest);
      }
    });
  });

  return (

    <tr className={className}>

      <td className='address'>
        <AddressMini value={validatorInfo?.account} />
      </td>
      {
        isJSON(validatorData) ? (
          <td className='address'>
            {
              isJSON(validatorData) ? JSON.parse(validatorData).referralId : ''
            }
          </td>
        ) : null
      }
      <td className='number'>
        {
          JSON.stringify(validatorInfo?.isValidating) === 'true' ? t<string>('Validator') :
            (JSON.stringify(validatorInfo?.isChilled) === 'true' ? t<string>('Drop Out') : t<string>('Candidate'))
        }

      </td>

      <td className='number'>
        {Number(validatorInfo?.selfBonded) / Math.pow(10, 8)} PCX
      </td>

      <td className='number'>
        {Number(validatorInfo?.totalNomination) / Math.pow(10, 8)} PCX
      </td>

      <td className='number'>
        {Number(validatorInfo?.rewardPotBalance) / Math.pow(10, 8)} PCX
      </td>

      <td className='button'>
        {isVoteOpen && (
          <Voter
            onClose={toggleVote}
            validatorId={validatorInfo?.account + ''}
            onSuccess={onStatusChange}
          />
        )}
        {
          isValidateOpen && (
            <Validate
              onClose={toggleValidate}
              validatorId={validatorInfo?.account + ''}
              onSuccess={onStatusChange}
            />
          )
        }
        {
          isChillOpen && (
            <Chill
              onClose={toggleChill}
              validatorId={validatorInfo?.account + ''}
              onSuccess={onStatusChange}
            />
          )
        }

        <Button
          icon='paper-plane'
          label={t<string>('Vote')}
          onClick={toggleVote}
        />

        <Popup
          className={`theme--${theme}`}
          isOpen={isSettingsOpen}
          onClose={toggleSettings}
          trigger={
            <Button
              icon='ellipsis-v'
              onClick={toggleSettings}
            />
          }
        >

          <Menu
            onClick={toggleSettings}
            text
            vertical
          >
            {createMenuGroup([

              (
                <Menu.Item
                  key='identityMain'
                  onClick={toggleValidate}
                >
                  {t<string>('Candidate')}
                </Menu.Item>
              ),
              (
                <Menu.Item
                  key='identitySub'
                  onClick={toggleChill}
                >
                  {t<string>('Drop')}
                </Menu.Item>
              )
            ])}

          </Menu>
        </Popup>

      </td>
    </tr>

  );
}

export default React.memo(Nomination);
