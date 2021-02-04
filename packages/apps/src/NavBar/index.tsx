import React from 'react';
import NavWrapper from './Wrapper';
import Faviconnav from '@polkadot/apps/NavBar/SideBars/Faviconnav';
import MainNav from '@polkadot/apps/NavBar/MainNav';

function NavBar() {
  return (
    <NavWrapper>
      <Faviconnav />
      <MainNav/>
    </NavWrapper>
  );
}

export default React.memo(NavBar);
