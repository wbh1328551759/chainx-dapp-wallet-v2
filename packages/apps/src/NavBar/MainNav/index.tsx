import React from 'react'
import NavItemList from '@polkadot/apps/NavBar/MainNav/NavItemList';
import SettingNode from '@polkadot/apps/NavBar/MainNav/SettingNode';

function MainNav(): React.ReactElement{
  return (
    <>
      <NavItemList/>
      <SettingNode/>
    </>
  )
}

export default MainNav;
