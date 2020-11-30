// Copyright 2017-2020 @polkadot/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import React, { useEffect, useState } from 'react';
import { Input, InputBalance, InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { InputXBTCBalance } from '@polkadot/react-components-chainx'
import { useTranslation } from '../../translate';
import styled from 'styled-components';

interface Props {
  onClose: () => void;
  btc: string | undefined | null;
  account: string | undefined
}
const Wrapper = styled(Modal)`
  > .content{
    > div > div:nth-child(2){
      display: flex;
      > span{
        margin-left: 3rem;
        color: red;
      }
    }
  }
`

function Withdraw({ account, btc, onClose }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const [amount, setAmount] = useState<BN | undefined>();
  const [memo, setMemo] = useState<string | null | undefined>();
  const [accountId, setAccount] = useState<string | null | undefined>();
  const [withdrawAddress, setWithdrawAddress] = useState<string | null | undefined>();
  const [disabled, setDisabled] = useState(false);
  const [addressErrMsg, setAddressErrMsg] = useState('')
  useEffect(() => {
    if (!withdrawAddress) {
      setAddressErrMsg('必填');
      setDisabled(true);
    } else if (!['1', '3'].includes(withdrawAddress[0])) {
      setAddressErrMsg('提现的BTC地址必须以1或3开头');
      setDisabled(true);
    } else {
      setAddressErrMsg('')
      setDisabled(false)
    }
console.log('btc:'+JSON.stringify(btc))
  }, [withdrawAddress]);

  return (
    <Wrapper
      header={t('XBTC withdrawals')}
      size='large'
    >
      <Modal.Content>
        <Modal.Columns>
          <Modal.Column>
            <InputAddress
              defaultValue={account}
              help={t('Select the account you want to withdrawal')}
              isDisabled={!!account}
              label={t('current account')}
              labelExtra={
                <div>
                  {t('you can withdrawal')} {Number(btc) / Math.pow(10, 8)} X-BTC
                </div>
              }
              onChange={setAccount}
              type='account'
            />
          </Modal.Column>
          <Modal.Column>
            <p>{t('withdrawal account')}</p>
          </Modal.Column>
        </Modal.Columns>

        <Modal.Columns>
          <Modal.Column>
            <Input
              help={t('the actual account you wish to withdraw')}
              label={t('btc withdraw address')}
              onChange={setWithdrawAddress}
            />
          </Modal.Column>
          <Modal.Column>
            <p>{t('btc withdraw address')}</p>
            <span>{addressErrMsg}</span>
          </Modal.Column>
        </Modal.Columns>

        <Modal.Columns>
          <Modal.Column>
            <InputXBTCBalance
              autoFocus
              help={t('the number of withdrawals')}
              label={t('the number of withdrawals')}
              onChange={setAmount}
            />
          </Modal.Column>
          <Modal.Column>
            <p>{t('the number of withdrawals')}</p>
          </Modal.Column>
        </Modal.Columns>

        <Modal.Columns>
          <Modal.Column>
            <Input
              autoFocus
              help={t('remark')}
              label={t('remark')}
              onChange={setMemo}
            />
          </Modal.Column>
          <Modal.Column>
            <p>{t('remark')}</p>
          </Modal.Column>
        </Modal.Columns>

      </Modal.Content>

      <Modal.Actions onCancel={onClose}>
        <TxButton
          accountId={accountId}
          icon='sign-in-alt'
          label={t('Withdrawals')}
          onStart={onClose}
          params={['1', amount, withdrawAddress, memo ? memo.trim() : '']}
          tx='xGatewayCommon.withdraw'
          isDisabled={disabled}
        />
      </Modal.Actions>
    </Wrapper>
  );
}

export default React.memo(Withdraw);
