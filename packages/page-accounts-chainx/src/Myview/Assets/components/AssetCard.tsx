import React, {ReactNode, useContext, useEffect, useState} from 'react';
import Card from './CardWrapper';
import Logo from './Logo';
import styled from 'styled-components';
import {useTranslation} from '@polkadot/app-accounts/translate';
import {useApi, useCall} from '@polkadot/react-hooks';
import FooterWithdrawal from '@polkadot/app-accounts-chainx/Myview/Assets/components/FooterWithdrawal';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';
import {toPrecision} from '@polkadot/app-accounts-chainx/Myview/toPrecision';
import BigNumber from 'bignumber.js';

const Hr = styled.hr`
  margin: 0;
`;
const HeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;

  > div:first-child{
    display: flex;
    align-items: center;
    > span:last-child{
      margin-left: 16px;
      font-size: 20px;
      font-weight: bold;
    }
  }
`;

export default function (props: { children?: ReactNode, buttonGroup?: ReactNode, logo?: any, footer?: ReactNode }) {
  const {logo} = props;
  const {t} = useTranslation();
  const {api} = useApi();
  const [allInterests, setAllInterests] = useState<number>();
  const [usableInterests, setUsableInterests] = useState<number>();
  const {currentAccount} = useContext(AccountContext);


  useEffect((): void => {
    async function getDividend(account: string) {
      const dividendRes = await api.rpc.xminingasset.getDividendByAccount(account);
      let currentDividend: any = '';
      const userDividend = JSON.parse(dividendRes);
      Object.keys(userDividend).forEach((key: string) => {
        currentDividend = userDividend[key];
      });
      const bgOwnInterests = new BigNumber(toPrecision(currentDividend.own, 4));
      const bgOtherInterests = new BigNumber(toPrecision(currentDividend.other, 4));
      const bgAllInterests = bgOwnInterests.toNumber() + bgOtherInterests.toNumber();

      setAllInterests(bgAllInterests);
      setUsableInterests(bgOwnInterests.toNumber());
    }

    getDividend('5TqDq71XesuCt8YFrXz2MqF1QqpJKYrg5LtCte3KWB7oyEBB');
  });
  return (
    <Card>
      <header>
        <p>{t('Cross-chain assets')}</p>
        <hr/>
      </header>
      <HeadWrapper>
        <Logo logo={logo}
              name='X-BTC'
              tokenName='Interchain BTC'/>
        {props.buttonGroup}
      </HeadWrapper>
      {props.children}
      <Hr/>
      <Footer>
        <div>
          <span>{t('Mining interest')}</span>
          <span>  {allInterests ? allInterests : 0} PCX</span>
        </div>
        <div>
          <FooterWithdrawal allInterests={allInterests} usableInterests={usableInterests}/>
        </div>
      </Footer>
    </Card>
  );
}
