// Copyright 2017-2020 @polkadot/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { Dispatch, useState } from 'react';
import { InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { useTranslation } from '../translate';
import { Available } from '@polkadot/react-query';
import { TxCallback } from '@polkadot/react-components/Status/types';


interface Props {
  onClose: () => void;
  validatorId: string | undefined;
  onSuccess?: TxCallback;
  account: string;
  setN: Dispatch<number>;
}

function Chill({ onClose, validatorId, onSuccess, account, setN }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [accountId, setAccount] = useState<string | null | undefined>();
  const transferrable = <span className='label'>{t<string>('transferrable')}</span>;

  return (
    <Modal
      header={t<string>('Node Drop')}
      size='large'
    >
      <Modal.Content>
        <Modal.Columns>
          <Modal.Column>
            <InputAddress
              defaultValue={account}
              help={t<string>('The actual account you wish to Drop')}
              isDisabled={!!account}
              label={t<string>('Drop Account')}
              labelExtra={
                <Available
                  label={transferrable}
                  params={account}
                />
              }
              onChange={setAccount}
              type='account'
            />
          </Modal.Column>
          <Modal.Column>
            <p>{t<string>('Drop this node')}</p>
          </Modal.Column>
        </Modal.Columns>
        {/* <Modal.Columns>
          <Modal.Column>
            <InputAddress
              defaultValue={validatorId}
              help='The validator acount you want to Drop'
              isDisabled={!!validatorId}
              label='Validator account'
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
            <p>{t<string>('Drop this node')}</p>
          </Modal.Column>
        </Modal.Columns> */}

      </Modal.Content>
      <Modal.Actions onCancel={onClose}>
        <TxButton
          accountId={accountId}
          icon='sign-in-alt'
          label={t<string>('Drop')}
          onStart={onClose}
          params={[]}
          tx='xStaking.chill'
          onSuccess={() => {
            setN(Math.random()),
            onSuccess
          }}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default React.memo(Chill);
