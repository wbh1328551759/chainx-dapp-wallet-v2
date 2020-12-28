import React from 'react';
import { useAccounts, useLoadingDelay} from '@polkadot/react-hooks';
import Account from './Account'
import {Icon} from '@polkadot/react-components';
import {Wrapper} from './Wrapper'

function Contacts(){
  const isLoading = useLoadingDelay();
  const { allAccounts, hasAccounts } = useAccounts();

  return (
    <Wrapper>
      <button className='addAccountBtn'>
        <Icon icon='plus'/>
      </button>
      {isLoading ? undefined : (hasAccounts && allAccounts?.map((account, index): React.ReactNode => (
        <Account value={account} key={index}/>
      )))}
    </Wrapper>
  )
}

export default Contacts
