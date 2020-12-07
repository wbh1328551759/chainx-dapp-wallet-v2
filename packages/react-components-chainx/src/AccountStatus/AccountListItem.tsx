// Copyright 2017-2020 @polkadot/app-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, {useContext} from 'react';
import styled from 'styled-components';


import { AddressSmall, Balance, Button} from '@polkadot/react-components';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';

function noop () { }

interface Props {
  address: string;
  className?: string;
  isFavorite: boolean;
  toggleFavorite: (address: string) => void;
  setStoredValue: string | ((value: string) => void) | undefined;
  isAccountChecked: boolean;
}

function Account ({ address, className, isAccountChecked, setStoredValue }: Props): React.ReactElement<Props> | null {
  // const { t } = useTranslation();
  const { changeAccount } = useContext(AccountContext);

  return (
    <tr className={className}>
      <td className='top'>
        <AddressSmall
          value={address}
        />
      </td>

      <td className='middle'>
        <Balance className='accountBox--all'
                 label={'余额： '}
                 params={address} />

      </td>
      <td className='number middle samewidth'>
        {isAccountChecked ? <Button
            icon={'check'}
            label={''}
            onClick={noop}
          >
          </Button>
          : <Button
            icon={'plus'}
            isBasic={true}
            label={'更改'}
            onClick={() => {
              setStoredValue(address)
              changeAccount(address)
            }}
          />}
      </td>
    </tr>
  );
}

export default styled(Account)`
  .accounts--Account-buttons {
    text-align: right;
  }

  .tags--toggle {
    cursor: pointer;
    width: 100%;
    min-height: 1.5rem;

    label {
      cursor: pointer;
    }
  }

  .name--input {
    width: 16rem;
  }

  .samewidth button:first-child {
    min-width: 6.5rem;
  }
`;
