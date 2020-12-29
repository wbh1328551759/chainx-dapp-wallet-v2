import React, {useContext} from 'react';
import {useAccounts, useLoadingDelay, useToggle} from '@polkadot/react-hooks';
import Account from './Account'
import {Icon, StatusContext} from '@polkadot/react-components';
import {Wrapper} from './Wrapper'
import CreateModal from '@polkadot/app-accounts-chainx/modals/Create';
import {sortAccounts} from '@polkadot/app-accounts-chainx/util';

function Contacts(){
  const isLoading = useLoadingDelay();
  const { allAccounts, hasAccounts } = useAccounts();
  const [isCreateOpen, toggleCreate] = useToggle();
  const {queueAction} = useContext(StatusContext);
  const sortedAccounts = sortAccounts(allAccounts, []);
  return (
    <Wrapper>
      {isCreateOpen && (
        <CreateModal
          onClose={toggleCreate}
          onStatusChange={queueAction}
        />
      )}

      <button className='addAccountBtn' onClick={toggleCreate}>
        <Icon icon='plus'/>
      </button>
      {isLoading ? undefined : (hasAccounts && sortedAccounts?.map(({account}, index): React.ReactNode => (
        <Account
          account={account}
          key={index}
          value={account.address}
        />
      )))}
    </Wrapper>
  )
}

export default Contacts
