import React, { useState, useContext } from 'react';
import { InputAddress, Modal, TxButton, Popup, Button, Menu } from '@polkadot/react-components';
import { useTranslation } from '../translate';
import { ThemeDef } from '@polkadot/react-components/types';
import { ThemeContext } from 'styled-components';
import { useToggle } from '@polkadot/react-hooks';
import { KeyringSectionOption } from '@polkadot/ui-keyring/options/types';
import { TxCallback } from '@polkadot/react-components/Status/types';
import { createMenuGroup, AddNoDuplicateElements } from '../utils';

import Chill from './chill';
import Validate from './validate';
import Voter from './vote'
import { ValidatorInfo } from '../types';

interface Props {
    account?: string;
    options?: KeyringSectionOption[];
    value?: string | null | undefined;
    onClose: () => void;
    onStatusChange?: TxCallback;
    className: string;
    validatorInfo: ValidatorInfo;
}

export default function PopMemu({ className = '', account, onClose, options, validatorInfo, onStatusChange }: Props): React.ReactElement<Props> {

    const { theme } = useContext<ThemeDef>(ThemeContext);
    const { t } = useTranslation();
    const [isSettingsOpen, toggleSettings] = useToggle();
    const [isValidateOpen, toggleValidate] = useToggle();
    const [isVoteOpen, toggleVote] = useToggle();

    // Declare no desire to validate for the origin account.
    const [isChillOpen, toggleChill] = useToggle();
    return (
        <div>
            { isVoteOpen && (
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
        </div>


    )
}
