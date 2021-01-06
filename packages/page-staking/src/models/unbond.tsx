// Copyright 2017-2020 @polkadot/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import React, { useState } from 'react';
import { InputBalance, InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { useTranslation } from '../translate';
import { KeyringSectionOption } from '@polkadot/ui-keyring/options/types';
import { Available } from '@polkadot/react-query';
import { TxCallback } from '@polkadot/react-components/Status/types';

interface Props {
  account?: string;
  options?: KeyringSectionOption[];
  value?: string | null | undefined;
  onClose: () => void;
  onSuccess?: TxCallback
}

function UnBond({ account, onClose, options, value, onSuccess }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [validatorId, setValidatorId] = useState<string | null | undefined>();
  const [amount, setAmount] = useState<BN | undefined>();

  const transferrable = <span className='label'>{t<string>('transferrable')}</span>;

  return (
    <Modal
      header={t<string>('UnBound')}
      size='large'
    >
      <Modal.Content>
        <Modal.Columns>
          <Modal.Column>
            <InputAddress
              defaultValue={account}
              help='The actual account you wish to UnBound account'
              isDisabled={!!account}
              label={t<string>('My Account')}
              labelExtra={
                <Available
                  label={transferrable}
                  params={account}
                />
              }
              type='account'
            />
          </Modal.Column>
          <Modal.Column>
            <p></p>
          </Modal.Column>
        </Modal.Columns>

        <Modal.Columns>
          <Modal.Column>
            <InputAddress
              defaultValue={value}
              help={t<string>('UnBound')}
              hideAddress={true}
              label={t<string>('UnBound')}
              labelExtra={
                <span> </span>
              }
              onChange={setValidatorId}
              options={
                options
              }
              type='allPlus'
            />
          </Modal.Column>
          <Modal.Column>
            <p>{t<string>('UnBound Validator')}</p>
          </Modal.Column>
        </Modal.Columns>

        <Modal.Columns>
          <Modal.Column>
            <InputBalance
              autoFocus
              help={t<string>('UnBound Amount')}
              label={t<string>('UnBound Amount')}
              onChange={setAmount}
            />
          </Modal.Column>
          <Modal.Column>
            <p>{t<string>('UnBound Amount')}</p>
          </Modal.Column>
        </Modal.Columns>
      </Modal.Content>

      <Modal.Actions onCancel={onClose}>
        <TxButton
          accountId={account}
          icon='sign-in-alt'
          label={t<string>('UnBound')}
          onStart={onClose}
          params={[validatorId, amount]}
          onSuccess={onSuccess}
          tx='xStaking.unbond'
        />
      </Modal.Actions>
    </Modal>
  );
}

export default React.memo(UnBond);
