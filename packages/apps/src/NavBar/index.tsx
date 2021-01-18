import React from 'react';
import NavWrapper from './Wrapper';
import Faviconnav from '@polkadot/apps/NavBar/Faviconnav';
import NavItemList from '@polkadot/apps/NavBar/NavItemList';
import SettingNode from '@polkadot/apps/NavBar/SettingNode';

function NavBar() {

  return (
    <NavWrapper>
      <Faviconnav />
      <NavItemList/>
      <SettingNode/>
    </NavWrapper>
  );
}

export default React.memo(NavBar);
