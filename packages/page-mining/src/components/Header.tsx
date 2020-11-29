import XBTCLogo from '../xbtc.svg';
import { Button, InputAddress, Modal, TxButton } from '@polkadot/react-components';
import React, { useContext, useState } from 'react';
import { useToggle } from '@polkadot/react-hooks';
import { useTranslation } from '@polkadot/apps/translate';
import { KeyringSectionOption } from '@polkadot/ui-keyring/options/types';
import { AssetsInfo } from '@polkadot/react-hooks-chainx/types';
import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';

interface Props {
  accounts: string[],
  interestTotal: number,
  allAssets: AssetsInfo[]
}

export default function ({ accounts, allAssets, interestTotal }: Props): React.ReactElement {
  const [accountId, setAccountId] = useState<string | null | undefined>();
  const [isWithDraw, toggleWithDraw] = useToggle();
  const { t } = useTranslation();
  const options: KeyringSectionOption[] = [];
  const { currentAccount } = useContext(AccountContext);

  accounts.map((account) => {
    options.push(
      {
        key: account,
        name: account,
        value: account
      }
    );
  });

  return (
    <header>
      <div className='title'>
        <img alt=''
          src={XBTCLogo as string}
          width='30' />
        <h6>X-BTC</h6>
      </div>
      <div className='right'>
        <span><span>{t('Total interest on all accounts')}：</span><span>{Number(interestTotal) / Math.pow(10, 8)} PCX</span></span>
        <Button
          icon='plus'
          label={t<string>('Withdraw interest')}
          onClick={toggleWithDraw} />
        {isWithDraw && (
          <Modal
            header={t('Withdrawal application of interest')}
            size='large'
          >
            <Modal.Content>
              <Modal.Columns>
                <Modal.Column>
                  <InputAddress
                    defaultValue={currentAccount}

                    help={t<string>('Select the account you want to withdrawal')}
                    label={t('Select the account for withdrawal')}
                    labelExtra={
                      <span>  {t('avaliable interest')} : {Number(allAssets.find((item) => item.account === accountId)?.XbtcInterests) / Math.pow(10, 8)} </span>
                    }
                    onChange={setAccountId}
                    type='account'
                    withLabel
                  />
                </Modal.Column>
                <Modal.Actions onCancel={toggleWithDraw}>
                  <TxButton
                    accountId={accountId}
                    icon='plus'
                    label={t('Withdraw interest')}
                    params={[1]}
                    tx='xMiningAsset.claim'
                  />
                </Modal.Actions>
              </Modal.Columns>
            </Modal.Content>
          </Modal>)
        }
      </div>
    </header>
  );
}
