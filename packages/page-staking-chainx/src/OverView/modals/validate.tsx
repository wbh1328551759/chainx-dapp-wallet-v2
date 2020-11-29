// Copyright 2017-2020 @polkadot/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import { InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { useTranslation } from '../../translate';
import { Available } from '@polkadot/react-query';
import { TxCallback } from '@polkadot/react-components/Status/types';

interface Props {
  onClose: () => void;
  validatorId: string | undefined;
  onSuccess?: TxCallback
}

function Validate({ onClose, validatorId, onSuccess }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const [accountId, setAccount] = useState<string | null | undefined>();
  const transferrable = <span className='label'>{t<string>('transferrable')}</span>;

  return (
    <Modal
      header={t<string>('Node participates in the election')}
      size='large'
    >
      <Modal.Content>
        <Modal.Columns>
          <Modal.Column>
            <InputAddress
              help='The actual account you wish to participates account'
              label='participates account'
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
            <p>{t<string>('Participates New Node')}</p>
          </Modal.Column>
        </Modal.Columns>
        <Modal.Columns>
          <Modal.Column>
            <InputAddress
              defaultValue={validatorId}
              help='The actual account you wish to participates '
              isDisabled={!!validatorId}
              label='validator account'
              labelExtra={
                <Available
                  label={transferrable}
                  params={validatorId}
                />
              }
              type='account'
            />
          </Modal.Column>
          <Modal.Column>
            <p>{t<string>('Participate in this node')}</p>
          </Modal.Column>
        </Modal.Columns>

      </Modal.Content>
      <Modal.Actions onCancel={onClose}>
        <TxButton
          accountId={accountId}
          icon='sign-in-alt'
          label={t<string>('Participate')}
          onStart={onClose}
          params={[]}
          tx='xStaking.validate'
          onSuccess={onSuccess}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default React.memo(Validate);
