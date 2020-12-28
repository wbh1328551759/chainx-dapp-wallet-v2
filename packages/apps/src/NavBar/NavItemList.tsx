import React from 'react';
import chainxLogo from '@polkadot/apps/NavBar/icons/ChainX_logo.svg';
import {Link} from 'react-router-dom';
import {Icon} from '@polkadot/react-components';
import linkOut from '@polkadot/apps/NavBar/icons/Link out.svg';
import {useToggle} from '@polkadot/react-hooks';
import Selector from '@polkadot/apps/NavBar/Selector';
import {useTranslation} from '@polkadot/apps/translate';


function NavItemList() {
  const { t } = useTranslation();
  const [isStakingOpen, toggleStaking, setToggleStaking] = useToggle();
  const [isGovernanceOpen, toggleGovernance, setToggleGovernance] = useToggle();
  const [isDeveloperOpen, toggleDeveloper, setToggleDeveloper] = useToggle();
  const stakingList = ([
    {nodeName: t<string>('Stak. over.'), link: '/staking/staking'},
    {nodeName: t<string>('My Staking'), link: '/staking/nomination'},
  ]);
  const governanceList = ([
    {nodeName: t<string>('Democracy'), link: '/democracy/democracy'},
    {nodeName: t<string>('Council'), link: '/democracy/council'},
    {nodeName: t<string>('Treasury'), link: '/democracy/treasury'},
    {nodeName: t<string>('Tech. comm.'), link: '/democracy/techcomm'},
    {nodeName: t<string>('Trustee'), link: '/democracy/trustee'}
  ]);
  const developerList = ([
    {nodeName: t<string>('Chain state'), link: '/chainstate/chainstate'},
    {nodeName: t<string>('Extrinsics'), link: '/chainstate/extrinsics'},
    {nodeName: t<string>('RPC calls'), link: '/chainstate/rpc'},
    {nodeName: t<string>('Sign and verify'), link: '/chainstate/signing'}
  ])

  return (
    <div className="left">
      <img src={chainxLogo} alt=""/>
      <ul>
        <li>
          <Link to={'/accounts'}>{t('Assets')}</Link>
        </li>
        <li className='staking' onClick={toggleStaking} >
          {t('Staking')}
          <Icon icon='angle-down' size='1x'/>
          {isStakingOpen && <Selector nodeList={stakingList} onMouseLeave={() => setToggleStaking(false)}/>}
        </li>
        <li className='governance' onClick={toggleGovernance}>
          {t('Manage')}
          <Icon icon='angle-down'/>
          {isGovernanceOpen && <Selector nodeList={governanceList}  onMouseLeave={() => setToggleGovernance(false)}/>}
        </li>
        <li>
          <Link to='/DEX'>{t('DEX')}</Link>
        </li>
        <li className='linkOutBrowser'>
          <a href="https://scan.chainx.org/" target='_blank'>
            {t('ChainScan')}
            <img src={linkOut} alt=""/>
          </a>
        </li>
        <li className='divideLine'/>
        <li className='developer' onClick={toggleDeveloper}>
          {t('Developer')}
          <Icon icon='angle-down'/>
          {isDeveloperOpen && <Selector nodeList={developerList} onMouseLeave={() => setToggleDeveloper(false)}/>}
        </li>
      </ul>
    </div>
  );
}

export default NavItemList;
