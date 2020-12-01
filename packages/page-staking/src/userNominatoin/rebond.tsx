// Copyright 2017-2020 @polkadot/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import React, { useEffect, useState } from 'react';
import { InputBalance, InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { useTranslation } from '../translate';
import { KeyringSectionOption } from '@polkadot/ui-keyring/options/types';
import { Available } from '@polkadot/react-query';
import { TxCallback } from '@polkadot/react-components/Status/types';
import { ValidatorInfo } from '../types';
import { useApi } from '@polkadot/react-hooks';

interface Props {
  account?: string;
  options?: KeyringSectionOption[];
  value?: string | null | undefined;
  onClose: () => void;
  onSuccess?: TxCallback
}

function ReBond({ account, onClose, options, value, onSuccess }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [validatorTo, setValidatorTo] = useState<string | null | undefined>();

  const [validatorOptions, setValidatorOptions] = useState<KeyringSectionOption[]>();
  const [amount, setAmount] = useState<BN | undefined>();
  const { api } = useApi();

  async function getValidator() {
    const validators = await api.rpc.xstaking.getValidators();
    let validatorOptionsArray: KeyringSectionOption[] = [];
    validators.forEach((item: any) => {
      const cur = item as ValidatorInfo;

      validatorOptionsArray.push({
        key: cur.account,
        value: cur.account,
        name: cur.account
      })
    });
    setValidatorTo(validatorOptionsArray[0].value)
    setValidatorOptions(validatorOptionsArray)
  }

  useEffect((): void => {
    getValidator()
  })

  const transferrable = <span className='label'>{t<string>('transferrable')}</span>;

  return (
    <Modal
      header={t<string>('Rebond')}
      size='large'
    >
      <Modal.Content>
        <Modal.Columns>
          <Modal.Column>
            <InputAddress
              defaultValue={account}
              help='The actual account you wish to register account'
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
            <p>{t<string>('Rebond vote validator')}</p>
          </Modal.Column>
        </Modal.Columns>

        <Modal.Columns>
          <Modal.Column>
            <InputAddress
              defaultValue={value}
              isDisabled={!!value}
              value={value}
              help={t<string>('from validator')}
              hideAddress={true}
              label={t<string>('from validator')}
              labelExtra={
                <span> </span>
              }
              // onChange={setValidatorFrom}
              // options={
              //   validatorOptions
              // }
              type='allPlus'
            />
          </Modal.Column>
          <Modal.Column>
            <p>{t<string>('from validator')}</p>
          </Modal.Column>
        </Modal.Columns>

        <Modal.Columns>
          <Modal.Column>
            <InputAddress
              help={t<string>('to validator')}
              hideAddress={true}
              label={t<string>('to validator')}
              labelExtra={
                <span> </span>
              }
              onChange={setValidatorTo}
              options={
                validatorOptions
              }
              defaultValue={(validatorOptions && validatorOptions?.length) > 0 ? validatorOptions[0]?.value : ''}
              type='allPlus'
            />
          </Modal.Column>
          <Modal.Column>
            <p>{t<string>('to validator')}</p>
          </Modal.Column>
        </Modal.Columns>

        <Modal.Columns>
          <Modal.Column>
            <InputBalance
              autoFocus
              help={t<string>('Rebond Amount')}
              label={t<string>('Rebond Amount')}
              onChange={setAmount}
            />
          </Modal.Column>
          <Modal.Column>
            <p>{t<string>('Rebond Amount')}</p>
          </Modal.Column>
        </Modal.Columns>
      </Modal.Content>

      <Modal.Actions onCancel={onClose}>
        <TxButton
          accountId={account}
          icon='sign-in-alt'
          label={t<string>('Rebond vote validator')}
          onStart={onClose}
          params={[value, validatorTo, amount]}
          onSuccess={onSuccess}
          tx='xStaking.rebond'
        />
      </Modal.Actions>
    </Modal>
  );
}

export default React.memo(ReBond);
