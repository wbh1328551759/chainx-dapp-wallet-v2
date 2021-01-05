import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Button, Forget, Icon, Menu, Popup} from '@polkadot/react-components';
import {useTranslation} from '@polkadot/app-accounts-chainx/translate';
import {useApi, useToggle} from '@polkadot/react-hooks';
import {ThemeDef} from '@polkadot/react-components/types';
import {ThemeContext} from 'styled-components';
import keyring from '@polkadot/ui-keyring';
import {KeyringAddress} from '@polkadot/ui-keyring/types';
import Transfer from '@polkadot/app-accounts/modals/Transfer';
import {ActionStatus} from '@polkadot/react-components/Status/types';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';
import {AccountId, AccountIndex, Address} from '@polkadot/types/interfaces';

const isEditable = true;

interface Props {
  address: AccountId | AccountIndex | Address | string;
}

function AccountActions({address}: Props): React.ReactElement<Props> {
  const {t} = useTranslation();
  const api = useApi();
  const [isPopupOpen, togglePopupOpen, setIsPopupOpen] = useToggle()
  const [isForgetOpen, toggleForgetOpen] = useToggle()
  const [isTransferOpen, toggleTransferOpen] = useToggle()
  const {currentAccount} = useContext(AccountContext)
  const {theme} = useContext<ThemeDef>(ThemeContext);
  const [current, setCurrent] = useState<KeyringAddress | null>(null);
  // const [genesisHash, setGenesisHash] = useState<string | null>(null);

  useEffect((): void => {
    const current = keyring.getAddress(address);

    setCurrent(current || null);
    // setGenesisHash((current && current.meta.genesisHash) || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _togglePopup = useCallback(
    (): void => setIsPopupOpen(false),
    [isPopupOpen]
  )



  const _onForget = useCallback(
    (): void => {
      if (address) {
        const status: Partial<ActionStatus> = {
          account: address,
          action: 'forget'
        };

        try {
          keyring.forgetAddress(address);
          status.status = 'success';
          status.message = t<string>('address forgotten');
        } catch (error) {
          status.status = 'error';
          status.message = (error as Error).message;
        }
      }
    },
    [address, t]
  );


  return (
    <>
      {address && current && (
        <>
          {isForgetOpen && (
            <Forget
              address={current.address}
              key='modal-forget-account'
              mode='address'
              onClose={toggleForgetOpen}
              onForget={_onForget}
            />
          )}
          {isTransferOpen && (
            <Transfer
              key='modal-transfer'
              onClose={toggleTransferOpen}
              recipientId={address}
              senderId={currentAccount}
            />
          )}
        </>
      )}
      <Popup
        className={`theme--${theme}`}
        isOpen={isPopupOpen}
        onClose={_togglePopup}
        trigger={
          <Icon icon='ellipsis-h' onClick={togglePopupOpen}/>
        }
      >
        <Menu
          onClick={togglePopupOpen}
          text
          vertical
        >
          <Menu.Item
            disabled={!isEditable}
            onClick={toggleForgetOpen}
          >
            {t<string>('Forget this address')}
          </Menu.Item>
          {api.api.tx.balances?.transfer &&
          (<Menu.Item
            disabled={!isEditable}
            onClick={toggleTransferOpen}
          >
            {t<string>('Transfer')}
          </Menu.Item>)}
        </Menu>
      </Popup>
    </>
  );
}


export default AccountActions;
