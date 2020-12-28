import React from 'react';
import Row from '@polkadot/react-components/Row';
import {toShortAddress} from '@polkadot/react-components/util';
import {DEFAULT_ADDR, Props} from '@polkadot/react-components/AddressRow';
import {useAccountInfo} from '@polkadot/react-hooks';
import IdentityIcon from '@polkadot/react-components/IdentityIcon';
import BaseIdentityIcon from '@polkadot/react-identicon';
import styled from 'styled-components';
import { Icon } from '@polkadot/react-components'
import {AccountWrapper} from './Wrapper'

const ICON_SIZE = 36;

function Account({buttons, children, className, defaultName, fullLength = false, isContract = false, isDisabled, isEditableName, isInline, isValid: propsIsValid, overlay, value, withTags = false}: Props): React.ReactElement<Props> | null {
  const {accountIndex, isNull, name, onSaveName, onSaveTags, setName, setTags, tags} = useAccountInfo(value ? value.toString() : null, isContract);
  const isValid = !isNull && (propsIsValid || value || accountIndex);
  const InfoIcon = value ? IdentityIcon : BaseIdentityIcon;
  const address = value && isValid ? value : DEFAULT_ADDR;


  return (
    <AccountWrapper>
      <Row
        address={fullLength ? address : toShortAddress(address)}
        buttons={buttons}
        className={className}
        defaultName={defaultName}
        icon={
          <InfoIcon
            size={ICON_SIZE}
            value={value ? value.toString() : null}
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

      <Icon icon='ellipsis-h'/>
    </AccountWrapper>
  );
}

export default Account;
