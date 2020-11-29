
import { Button, InputAddress, Modal } from '@polkadot/react-components';
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useAccountInfo, useToggle, useAccounts } from '@polkadot/react-hooks';
import { useLocalStorage } from '@polkadot/react-hooks-chainx'
import { AccountContext } from './AccountProvider';
import { useTranslation } from './translate';

const Wrapper = styled.div`
  position: absolute;
  right: 25px;
  top: 21px;
  display: flex;
  align-items: center;
  margin-right: 1rem;
  > button {
    margin-right: 1rem;
  }
`;

export default function (): React.ReactElement {
  const [isAccountList, toggleAccountList] = useToggle();
  let [storedValue, setValue] = useLocalStorage<string>('currentAccount');
  const { allAccounts } = useAccounts();
  const { t } = useTranslation();

  const [account, setAccount] = useState<string>(storedValue);
  const { changeAccount } = useContext(AccountContext);

  const { name } = useAccountInfo(account || (allAccounts.length > 0 ? allAccounts[0] : ''));
  useEffect((): void => {
    if (storedValue === 'undefined' || storedValue === null || storedValue === undefined) {
      const defaultAccount = allAccounts.length > 0 ? allAccounts[0] : ''
      setValue(defaultAccount);
      setAccount(defaultAccount);
      changeAccount(defaultAccount)
    }
  }, [account]);

  return (
    <Wrapper>
      <Button
        icon='plus'
        label={t('Select account')}
        onClick={toggleAccountList} />
      {name}
      {
        isAccountList && (
          <Modal
            header={t('Please select your account')}
            size='large'
          >
            <Modal.Content>
              <Modal.Columns>
                <Modal.Column>
                  <InputAddress
                    help={t('Please select the account you want to view')}
                    label={t('Select account')}
                    onChange={setAccount}
                    type='account'
                    withLabel
                  />
                </Modal.Column>
                <Modal.Actions onCancel={toggleAccountList}>
                  <Button
                    icon='check'
                    label={t('Ensure')}
                    onClick={() => {
                      toggleAccountList();
                      setValue(account);
                      changeAccount(account);
                    }} />
                </Modal.Actions>
              </Modal.Columns>
            </Modal.Content>
          </Modal>)
      }
    </Wrapper>
  );
}
