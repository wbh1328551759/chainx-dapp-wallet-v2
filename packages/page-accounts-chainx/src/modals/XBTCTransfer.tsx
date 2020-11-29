// Copyright 2017-2020 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InputAddress, Input, Modal, TxButton } from '@polkadot/react-components';
// import { useApi, useCall } from '@polkadot/react-hooks';
// import { BN_ZERO, isFunction } from '@polkadot/util';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  onClose: () => void;
  recipientId?: string;
  senderId?: string;
}
const P = styled.p`
  color: red;
`
function Transfer ({ className = '', onClose, recipientId: propRecipientId, senderId: propSenderId }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<string | undefined>();
  const [hasAvailable] = useState(true);
  const [maxTransfer, setMaxTransfer] = useState<BN | null>(null);
  const [recipientId, setRecipientId] = useState<string | null>(propRecipientId || null);
  const [senderId, setSenderId] = useState<string | null>(propSenderId || null);
  const [amountErrMsg, setAmountErrMsg] = useState('')
  useEffect(() => {
    if(Number(amount) <= 0){
      setAmountErrMsg('请输入有效数量')
    }else{
      setAmountErrMsg('')
    }

  }, [amount])

  return (
    <Modal
      className='app--accounts-Modal'
      header={t<string>('Send funds')}
      size='large'
    >
      <Modal.Content>
        <div className={className}>
          <Modal.Columns>
            <Modal.Column>
              <InputAddress
                defaultValue={propSenderId}
                help={t<string>('The account you will send funds from.')}
                isDisabled={!!propSenderId}
                label={t<string>('send from account')}
                labelExtra={
                  <span>
                  </span>
                }
                onChange={setSenderId}
                type='account'
              />
            </Modal.Column>
            <Modal.Column>
              <p>{t<string>('The transferred balance will be subtracted (along with fees) from the sender account.')}</p>
            </Modal.Column>
          </Modal.Columns>
          <Modal.Columns>
            <Modal.Column>
              <InputAddress
                defaultValue={propRecipientId}
                help={t<string>('Select a contact or paste the address you want to send funds to.')}
                isDisabled={!!propRecipientId}
                label={t<string>('send to address')}
                labelExtra={
                  <span>
                  </span>
                }
                onChange={setRecipientId}
                type='allPlus'
              />
            </Modal.Column>
            <Modal.Column>
              <p>{t<string>('The beneficiary will have access to the transferred fees when the transaction is included in a block.')}</p>
            </Modal.Column>
          </Modal.Columns>
          <Modal.Columns>
            <Modal.Column>
              <Input
                autoFocus
                help={t<string>('Transfer X-BTC Amount')}
                isError={!hasAvailable}
                label={t<string>('Transfer X-BTC Amount')}
                onChange={setAmount}
                type={'number'}
              />
            </Modal.Column>
            <Modal.Column>
              <P>{amountErrMsg}</P>
            </Modal.Column>
          </Modal.Columns>
        </div>
      </Modal.Content>
      <Modal.Actions onCancel={onClose}>
        <TxButton
          accountId={senderId}
          icon='paper-plane'
          isDisabled={!hasAvailable || !recipientId || !amount || (Number(amount) <= 0)}
          label={t<string>('Make Transfer')}
          onStart={onClose}
          params={
            [recipientId, 1, Number(amount) * Math.pow(10, 8)]
          }
          tx={'xAssets.transfer'}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default React.memo(styled(Transfer)`
  .balance {
    margin-bottom: 0.5rem;
    text-align: right;
    padding-right: 1rem;

    .label {
      opacity: 0.7;
    }
  }

  label.with-help {
    flex-basis: 10rem;
  }

  .typeToggle {
    text-align: right;
  }

  .typeToggle+.typeToggle {
    margin-top: 0.375rem;
  }
`);
