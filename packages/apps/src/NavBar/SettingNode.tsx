import React from 'react';
import {Icon} from '@polkadot/react-components';
import helpIcon from '@polkadot/apps/NavBar/icons/Help center.svg';
import {Link} from 'react-router-dom';
import setting from '@polkadot/apps/NavBar/icons/Set up.svg';
import AccountSelect from '@polkadot/apps/Menu/NodeInfo';

function SettingNode(){
  return (
    <ul className="right">
      <li className='switchNode'>
        <div className='circle'/>
        <div>Main Network</div>
        <Icon icon='angle-down' size='1x'/>
      </li>
      <li className='icon'>
        <img src={helpIcon} alt=""/>
      </li>
      <li className='icon'>
        <Link to='/settings'><img src={setting} alt=""/></Link>
      </li>
      <li className='accountSelector'>
        <AccountSelect/>
      </li>
    </ul>
  )
}

export default SettingNode
