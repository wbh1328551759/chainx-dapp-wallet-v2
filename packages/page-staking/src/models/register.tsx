// Copyright 2017-2020 @polkadot/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import React, { Dispatch, useState } from 'react';
import { Input, InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { useTranslation } from '../translate';
import { Available } from '@polkadot/react-query';
import { TxCallback } from '@polkadot/react-components/Status/types';
import InputPCXBalance from '@polkadot/react-components-chainx/InputPCXBalance';
import { useAccounts } from '@polkadot/react-hooks';

interface Props {
  nodeslist?: string[],
  onClose: () => void;
  onSuccess?: TxCallback;
  account: string;
  setN: Dispatch<number>;
}

function RegisterNewNode({ nodeslist, onClose, onSuccess, account, setN }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [nodeName, setNodeName] = useState<string | null | undefined>();
  const [amount, setAmount] = useState<BN | undefined>();
  const [accountId, setAccount] = useState<string | null | undefined>();
  const transferrable = <span className='label'>{t<string>('transferrable')}</span>;
  const { hasAccounts } = useAccounts();
  return (
    <Modal
      header={t<string>('Register new node')}
      size='large'
    >
      <Modal.Content>
        <Modal.Columns>
          <Modal.Column>
            {
              hasAccounts ? <InputAddress
              defaultValue={account}
              help='The actual account you wish to register account'
              label={t<string>('Register Account')}
              isDisabled={!!account}
              labelExtra={
                <Available
                  label={transferrable}
                  params={account}
                />
              }
              onChange={setAccount}
              type='account'
            /> :
            <InputAddress
              defaultValue={accountId}
              help='The actual account you wish to register account'
              label={t<string>('Register Account')}
              isDisabled={!!accountId}
              labelExtra={
                <Available
                  label={transferrable}
                  params={accountId}
                />
              }
              onChange={setAccount}
              type='account'
            />
          }
          </Modal.Column>
          <Modal.Column>
            <p>{t<string>('Register new node')}</p>
          </Modal.Column>
        </Modal.Columns>
        <Modal.Columns>
          <Modal.Column>
            <Input
              help={t<string>('The node name you choose to run')}
              label={t<string>('Unique, within 12 characters，make sure not repeated, 10 pcx fees will be deduct')}
              onChange={setNodeName}
              type='text'
            />
          </Modal.Column>
          <Modal.Column>
            <p>{t<string>('Unique and unchangeable, non-transferable after registration')}</p>
          </Modal.Column>
        </Modal.Columns>
        <Modal.Columns>
          <Modal.Column>
            <InputPCXBalance
              autoFocus
              help={t<string>('Number of node mortgages')}
              label={t<string>('Number of node mortgages')}
              onChange={setAmount}
            />
          </Modal.Column>
          <Modal.Column>
            <p>{t<string>('Number of node mortgages')}</p>
          </Modal.Column>
        </Modal.Columns>
      </Modal.Content>
      <Modal.Actions onCancel={onClose}>
        <TxButton
          accountId={accountId}
          icon='sign-in-alt'
          label={t<string>('Register')}
          onStart={onClose}
          onSuccess={() => {
            setN(Math.random()),
            onSuccess
          }}
          params={[nodeName, amount]}
          tx='xStaking.register'
        />
      </Modal.Actions>
    </Modal>
  );
}

export default React.memo(RegisterNewNode);
