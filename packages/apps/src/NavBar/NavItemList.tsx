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
  const [isStakingOpen,, setToggleStaking] = useToggle();
  const [isGovernanceOpen,, setToggleGovernance] = useToggle();
  const [isDeveloperOpen,, setToggleDeveloper] = useToggle();
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
    {nodeName: t<string>('Sign and verify'), link: '/chainstate/signing'},
    {nodeName: t<string>('Recent blocks'), link: '/chainstate/explorer'}
  ])

  return (
    <div className="left">
      <img src={chainxLogo} alt=""/>
      <ul>
        <li className='assets'>
          <Link to={'/accounts'}>{t('Assets')}</Link>
        </li>
        <li className='staking' onMouseEnter={() => {setToggleStaking(true)}} >
          <Link to={'/staking/staking'}>{t('Staking')}</Link>
          <Icon icon='angle-down' size='1x'/>
          {isStakingOpen && <Selector nodeList={stakingList} onMouseLeave={() => {setToggleStaking(false);console.log('leave')}}/>}
        </li>
        <li className='governance' onMouseEnter={() => setToggleGovernance(true)}>
          <Link to={'/democracy/democracy'}>{t('Manage')}</Link>
          <Icon icon='angle-down'/>
          {isGovernanceOpen && <Selector nodeList={governanceList}  onMouseLeave={() => setToggleGovernance(false)}/>}
        </li>
        <li className='dex'>
          <Link to='/DEX'>{t('DEX')}</Link>
        </li>
        <li className='linkOutBrowser'>
          <a href="https://scan.chainx.org/" target='_blank'>
            {t('ChainScan')}
            <img src={linkOut} alt=""/>
          </a>
        </li>
        <li className='divideLine'/>
        <li className='developer' onMouseEnter={() => setToggleDeveloper(true)}>
          <Link to={'/chainstate/chainstate'}>{t('Developer')}</Link>
          <Icon icon='angle-down'/>
          {isDeveloperOpen && <Selector nodeList={developerList} onMouseLeave={() => setToggleDeveloper(false)}/>}
        </li>
      </ul>
    </div>
  );
}

export default NavItemList;
