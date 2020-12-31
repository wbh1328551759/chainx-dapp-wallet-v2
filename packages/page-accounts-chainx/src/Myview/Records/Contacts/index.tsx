import React, { useContext, useEffect, useState } from 'react';
import { useAddresses, useFavorites, useLoadingDelay, useToggle } from '@polkadot/react-hooks';
import { Icon, StatusContext } from '@polkadot/react-components';
import { Wrapper } from './Wrapper'
import CreateModal from '@polkadot/app-addresses/modals/Create';
import Address from './Address';

type SortedAddress = { address: string; isFavorite: boolean };

const STORE_FAVS = 'accounts:favorites';

function AllAccounts(){
  const isLoading = useLoadingDelay();
  const { allAddresses } = useAddresses();
  const [sortedAddresses, setSortedAddresses] = useState<SortedAddress[] | undefined>();
  const [favorites, toggleFavorite] = useFavorites(STORE_FAVS);
  const [filterOn, setFilter] = useState<string>('');

  const [isCreateOpen, toggleCreate] = useToggle();
  const {queueAction} = useContext(StatusContext);

  useEffect((): void => {
    setSortedAddresses(
      allAddresses
        .map((address): SortedAddress => ({ address, isFavorite: favorites.includes(address) }))
        .sort((a, b): number =>
          a.isFavorite === b.isFavorite
            ? 0
            : b.isFavorite
            ? 1
            : -1
        )
    );
  }, [allAddresses]);

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
      {!isLoading && sortedAddresses && sortedAddresses.length > 0 && sortedAddresses.map(({ address, isFavorite }): React.ReactNode => (
        <Address key={address} value={address}/>
      ))}
    </Wrapper>
  )
}

export default AllAccounts
