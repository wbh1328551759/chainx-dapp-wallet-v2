import React from 'react';
import {Icon} from '@polkadot/react-components';
import {Link} from 'react-router-dom';
import AccountSelect from '@polkadot/apps/Menu/NodeInfo';
import {useToggle} from '@polkadot/react-hooks';
import Endpoints from '@polkadot/apps/Endpoints';
import getApiUrl from '@polkadot/apps/initSettings';

function SettingNode() {
  const [isEndpointsVisible, toggleEndpoints] = useToggle();
  const apiUrl = getApiUrl()
  const netInfo = apiUrl.slice(6).replace('.chainx.org/ws', '')

  return (
    <>
      <ul className="right">
        <li className='switchNode' onClick={toggleEndpoints}>
          <div className='circle'/>
          <div className='netInfo'>{netInfo}</div>
          <Icon icon='angle-down' size='1x'/>
        </li>
        {/*<li className='icon'>*/}
        {/*  <a href="https://chainx-doc.gitbook.io/chainx-user-doc/" target='_blank'>*/}
        {/*    <Icon icon='question-circle' size='lg'/>*/}
        {/*  </a>*/}
        {/*</li>*/}
        <li className='icon'>
          <Link to='/settings/settings'>
            <Icon icon='cog' size='lg'/>
          </Link>
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
