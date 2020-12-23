import React from 'react';
import {Icon} from '@polkadot/react-components';
import helpIcon from '@polkadot/apps/NavBar/icons/Help center.svg';
import {Link} from 'react-router-dom';
import setting from '@polkadot/apps/NavBar/icons/Set up.svg';
import AccountSelect from '@polkadot/apps/Menu/NodeInfo';
import {useToggle} from '@polkadot/react-hooks';
import Endpoints from '@polkadot/apps/Endpoints';

function SettingNode() {
  const [isEndpointsVisible, toggleEndpoints] = useToggle();

  return (
    <>
      <ul className="right">
        <li className='switchNode' onClick={toggleEndpoints}>
          <div className='circle'/>
          <div>Main Network</div>
          <Icon icon='angle-down' size='1x'/>
        </li>
        <li className='icon'>
          <a href="https://chainx-doc.gitbook.io/chainx-user-doc/" target='_blank'>
            <img src={helpIcon} alt=""/>
          </a>
        </li>
        <li className='icon'>
          <Link to='/settings'><img src={setting} alt=""/></Link>
        </li>
        <li className='accountSelector'>
          <AccountSelect/>
        </li>
      </ul>
      {isEndpointsVisible && (
        <Endpoints onClose={toggleEndpoints}/>
      )}
    </>
  );
}

export default SettingNode;
