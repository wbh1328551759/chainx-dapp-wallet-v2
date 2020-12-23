import React from 'react';
import chainxLogo from './icons/ChainX_logo.svg';
import linkOut from './icons/Link out.svg';
import helpIcon from './icons/Help center.svg';
import setting from './icons/Set up.svg'
import {Icon} from '@polkadot/react-components';
import AccountSelect from '../Menu/NodeInfo';
import {useToggle} from '@polkadot/react-hooks';
import NavWrapper from './Wrapper';
import {Link} from 'react-router-dom'

function NavBar() {
  const [isStakingOpen, toggleStaking] = useToggle()
  const [isGovernanceOpen, toggleGovernance] = useToggle()
  return (
    <NavWrapper>
      <div className="left">
        <img src={chainxLogo} alt=""/>
        <ul>
          <li>
            <Link to={'/accounts'}>资产</Link>
          </li>
          <li className='staking' onClick={toggleStaking}>
            投票抵押
            <Icon icon='angle-down' size='1x'/>
            {isStakingOpen && <div className='selector' >
              <Link to={'/staking'}><span>质押概览</span></Link>
              <Link to={'/staking/nomination'}><span>我的质押</span></Link>
            </div>}
          </li>
          <li onClick={toggleGovernance}>
            治理
            <Icon icon='angle-down'/>
            {isGovernanceOpen && <div className='selector'>
              <Link to='/democracy'><span>民主权利</span></Link>
              <Link to='/council'><span>议会</span></Link>
              <Link to='/treasury'><span>财政</span></Link>
              <Link to='/techcomm'><span>技术委员会</span></Link>
              <Link to='/trustee'><span>资产信托</span></Link>
            </div>}
          </li>
          <li>
            <Link to='/DEX'>交易</Link>
          </li>
          <li className='linkOutBrowser'>
            <a href="https://scan-v2.chainx.org/" target='_blank'>
              区块浏览器
              <img src={linkOut} alt=""/>
            </a>
          </li>
          <li className='divideLine'/>
          <li>开发者<Icon icon='angle-down'/></li>
        </ul>
      </div>

      <ul className="right">
        <li className='switchNode'>
          <div className='circle'/>
          <div>Main Newwork</div>
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

    </NavWrapper>
  );
}

export default React.memo(NavBar);
