import React from 'react';
import { useAccounts, useLoadingDelay} from '@polkadot/react-hooks';
import Account from './Account'

function Contacts(){
  const isLoading = useLoadingDelay();
  const { allAccounts, hasAccounts } = useAccounts();



  return (
    <div>
      {isLoading ? undefined : (hasAccounts && allAccounts?.map((account, index): React.ReactNode => (
        <Account value={account} key={index}/>
      )))}
    </div>
  )
}

export default Contacts
