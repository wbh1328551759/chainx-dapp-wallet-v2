import React from 'react';
import NavWrapper from './Wrapper';
import NavItemList from '@polkadot/apps/NavBar/NavItemList';
import SettingNode from '@polkadot/apps/NavBar/SettingNode';
import {useToggle} from '@polkadot/react-hooks';

function NavBar() {
  const [isStakingOpen, , setToggleStaking] = useToggle();
  const [isGovernanceOpen, , setToggleGovernance] = useToggle();
  const [isDeveloperOpen, , setToggleDeveloper] = useToggle();

  const isOpen = {
    isStakingOpen,
    isGovernanceOpen,
    isDeveloperOpen
  }

  const toggleSelector = (e) => {
    if (e.clientX >= 212 && e.clientX <= 310) {
      setToggleStaking(true);
    } else if (e.clientX >= 315 && e.clientX <= 390) {
      setToggleGovernance(true);
    } else if (e.clientX >= 599 && e.clientX <= 700) {
      setToggleDeveloper(true);
    } else {
      setToggleStaking(false);
      setToggleGovernance(false);
      setToggleDeveloper(false)
    }
  };

  return (
    <NavWrapper onMouseMove={(e) => toggleSelector(e)}>
      <NavItemList
        isOpen={isOpen}
        setToggleStaking={setToggleStaking}
        setToggleGovernance={setToggleGovernance}
        setToggleDeveloper={setToggleDeveloper}
      />
      <SettingNode/>
    </NavWrapper>
  );
}

export default React.memo(NavBar);
