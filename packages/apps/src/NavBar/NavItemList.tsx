import React, {Dispatch} from 'react';
import chainxLogo from '@polkadot/apps/NavBar/icons/ChainX_logo.svg';
import { Link } from 'react-router-dom';
import { Icon } from '@polkadot/react-components';
import linkOut from '@polkadot/apps/NavBar/icons/Link out.svg';
import Selector from '@polkadot/apps/NavBar/Selector';
import { useTranslation } from '@polkadot/apps/translate';

interface IsOpenProps{
  isStakingOpen: boolean;
  isGovernanceOpen: boolean;
  isDeveloperOpen: boolean;
}

interface Props {
  isOpen: IsOpenProps;
  setToggleStaking: Dispatch<any>;
  setToggleGovernance: Dispatch<any>;
  setToggleDeveloper: Dispatch<any>;
}

function NavItemList({isOpen:{isStakingOpen, isGovernanceOpen, isDeveloperOpen}, setToggleStaking, setToggleGovernance,setToggleDeveloper}: Props):React.ReactElement<Props> {
  const {t} = useTranslation();
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


  return (
    <div className="left">
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
          <Selector nodeList={developerList}
                    onMouseLeave={() => setToggleDeveloper(false)}/>}
        </li>
      </ul>
    </div>
  );
}

export default NavItemList;
