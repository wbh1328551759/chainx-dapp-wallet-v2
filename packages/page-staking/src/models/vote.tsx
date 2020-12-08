// Copyright 2017-2020 @polkadot/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import React, { useState } from 'react';
import { InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { useTranslation } from '../translate';
import { Available } from '@polkadot/react-query';
import { TxCallback } from '@polkadot/react-components/Status/types';
import InputPCXBalance from '@polkadot/react-components-chainx/InputPCXBalance';

interface Props {
  validatorId: string | null | undefined;
  onClose: () => void;
  onSuccess?: TxCallback
}

function VoteNode({ onClose, validatorId, onSuccess }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<BN | undefined>();
  const [accountId, setAccount] = useState<string | null | undefined>();

  const transferrable = <span className='label'>{t<string>('transferrable')}</span>;

  return (
    <Modal
      header={t<string>('Vote')}
      size='large'
    >
      <Modal.Content>
        <Modal.Columns>
          <Modal.Column>
            <InputAddress
              help='The actual account you wish to vote account'
              label={t<string>('My Account')}
              labelExtra={
                <Available
                  label={transferrable}
                  params={accountId}
                />
              }
              onChange={setAccount}
              type='account'
            />
          </Modal.Column>
          <Modal.Column>
            <p>{t<string>('Vote for Validator')}</p>
          </Modal.Column>
        </Modal.Columns>

        <Modal.Columns>
          <Modal.Column>
            <InputAddress
              defaultValue={validatorId}
              help={t<string>('Vote for Validator')}
              isDisabled={!!validatorId}
              label={t<string>('Vote for Validator')}
              labelExtra={
                <Available
                  label={transferrable}
                  params={validatorId}
                />
              }
              type='allPlus'
            />
          </Modal.Column>
          <Modal.Column>
            <p>{t<string>('Current Vote Validator')}</p>
          </Modal.Column>
        </Modal.Columns>

        <Modal.Columns>
          <Modal.Column>
            <InputPCXBalance
              autoFocus
              help={t<string>('Vote Amount')}
              label={t<string>('Vote Amount')}
              onChange={setAmount}
            />
          </Modal.Column>
          <Modal.Column>
            <p>{t<string>('Vote Amount')}</p>
          </Modal.Column>
        </Modal.Columns>
      </Modal.Content>

      <Modal.Actions onCancel={onClose}>
        <TxButton
          accountId={accountId}
          icon='sign-in-alt'
          label={t<string>('Vote')}
          onStart={onClose}
          params={[validatorId, amount]}
          tx='xStaking.bond'
          onSuccess={onSuccess}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default React.memo(VoteNode);
