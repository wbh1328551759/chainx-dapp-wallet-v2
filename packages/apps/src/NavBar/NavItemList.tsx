import React from 'react';
import chainxLogo from '@polkadot/apps/NavBar/icons/ChainX_logo.svg';
import { Link } from 'react-router-dom';
import { Icon } from '@polkadot/react-components';
import linkOut from '@polkadot/apps/NavBar/icons/Link out.svg';
import { useToggle } from '@polkadot/react-hooks';
import Selector from '@polkadot/apps/NavBar/Selector';
import { useTranslation } from '@polkadot/apps/translate';

function NavItemList() {
  const {t} = useTranslation();
  const [isStakingOpen, , setToggleStaking] = useToggle();
  const [isGovernanceOpen, , setToggleGovernance] = useToggle();
  const [isDeveloperOpen, , setToggleDeveloper] = useToggle();
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
  ]);

  const toggleSelector = (e) => {
    if (e.clientX >= 212 && e.clientX <= 313) {
      setToggleStaking(true);

    } else if (e.clientX >= 315 && e.clientX <= 415) {
      setToggleGovernance(true);
    } else if (e.clientX >= 599 && e.clientX <= 688) {
      setToggleDeveloper(true);
    } else {
      setToggleStaking(false);
      setToggleGovernance(false);
      setToggleDeveloper(false);
    }
  };

  return (
    <div className="left"
         onMouseMove={(e) => {toggleSelector(e);}}
         onMouseLeave={() => setToggleDeveloper(false)}
    >
      <img src={chainxLogo} alt=""/>
      <ul>
        <li className='assets'>
          <Link to={'/accounts'}>{t('Assets')}</Link>
        </li>
        <li className='staking'>
          <Link to={'/staking/staking'}>
            {t('Staking')}
            <Icon icon='angle-down' size='1x'/>
          </Link>
          {isStakingOpen &&
          <Selector
            nodeList={stakingList}
            onMouseLeave={() => setToggleStaking(false)}
          />}
        </li>

        <li className='governance'>
          <Link to={'/democracy/democracy'}>
            {t('Manage')}
            <Icon icon='angle-down'/>
          </Link>
          {isGovernanceOpen &&
          <Selector nodeList={governanceList}
                    onMouseEnter={() => setToggleGovernance(true)}
                    onMouseLeave={() => setToggleGovernance(false)}
          />}
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

        <li className='developer'>
          <Link to={'/chainstate/chainstate'}>
            {t('Developer')}
            <Icon icon='angle-down'/>
          </Link>
          {isDeveloperOpen &&
          <Selector
            nodeList={developerList}
            onMouseLeave={() => setToggleDeveloper(false)}
          />}
        </li>
      </ul>
    </div>
  );
}

export default NavItemList;
