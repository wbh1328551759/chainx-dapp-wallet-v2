import React from 'react';
import Row from '@polkadot/react-components/Row';
import {toShortAddress} from '@polkadot/react-components/util';
import {DEFAULT_ADDR, Props} from '@polkadot/react-components/AddressRow';
import {useAccountInfo} from '@polkadot/react-hooks';
import IdentityIcon from '@polkadot/react-components/IdentityIcon';
import BaseIdentityIcon from '@polkadot/react-identicon';
import {AccountWrapper} from './Wrapper';
import BN from 'bn.js';
import {KeyringAddress} from '@polkadot/ui-keyring/types';
import {Delegation} from '@polkadot/app-accounts-chainx/types';
import {ProxyDefinition} from '@polkadot/types/interfaces';
import AccountActions from '@polkadot/react-components-chainx/AccountStatus/AccountActions';

const ICON_SIZE = 36;


interface AccountProps extends Props {
  account: KeyringAddress;
  className?: string;
  delegation?: Delegation;
  proxy?: [ProxyDefinition[], BN];
}

function Account({account, proxy, delegation, buttons, children, className, defaultName, fullLength = false, isContract = false, isDisabled, isEditableName, isInline, isValid: propsIsValid, overlay, withTags = false}: AccountProps): React.ReactElement<AccountProps> | null {

  const {accountIndex, isNull, name, onSaveName, onSaveTags, setName, setTags, tags} = useAccountInfo(account.address ? account.address.toString() : null, isContract);
  const isValid = !isNull && (propsIsValid || account.address || accountIndex);
  const InfoIcon = account.address ? IdentityIcon : BaseIdentityIcon;
  const newAddress = account.address && isValid ? account.address : DEFAULT_ADDR;


  return (
    <AccountWrapper>
      <Row
        address={fullLength ? newAddress : toShortAddress(newAddress)}
        buttons={buttons}
        className={className}
        defaultName={defaultName}
        icon={
          <InfoIcon
            size={ICON_SIZE}
            value={account.address ? account.address.toString() : null}
          />
        }
        isDisabled={isDisabled}
        isEditableName={isEditableName}
        isEditableTags
        isInline={isInline}
        name={name}
        onChangeName={setName}
        onChangeTags={setTags}
        onSaveName={onSaveName}
        onSaveTags={onSaveTags}
        tags={withTags && tags}
      >
        {children}
        {overlay}
      </Row>
      <AccountActions
        account={account}
        propsIsValid={propsIsValid}
        isContract={isContract}
        delegation={delegation}
        proxy={proxy}
      />
    </AccountWrapper>
  );
}

export default Account;
