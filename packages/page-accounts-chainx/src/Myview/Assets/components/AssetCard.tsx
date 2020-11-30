import React, { ReactNode, useContext, useEffect, useState } from 'react';
import Card from './CardWrapper';
import Logo from './Logo';
import styled from 'styled-components';
import { useTranslation } from '@polkadot/app-accounts/translate';
import {useApi, useCall} from '@polkadot/react-hooks';
import FooterWithdrawal from '@polkadot/app-accounts-chainx/Myview/Assets/components/FooterWithdrawal';
import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';
import accounts from '@polkadot/apps-routing/accounts';

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
  const { logo } = props;
  const { t } = useTranslation();
  const { api } = useApi();
  const [interests, setInterests] = useState<number>(0);
  const { currentAccount } = useContext(AccountContext);
  const x = useCall<string>(api.rpc.xminingasset.getMinerLedgerByAccount, ['5TqDq71XesuCt8YFrXz2MqF1QqpJKYrg5LtCte3KWB7oyEBB'])
  const aaa = useCall<string>(api.rpc.xminingasset.getDividendByAccount, ['5TqDq71XesuCt8YFrXz2MqF1QqpJKYrg5LtCte3KWB7oyEBB'])

  useEffect(() => {
   // console.log('x:'+JSON.stringify(x))
   // console.log(JSON.stringify(x))
   // console.log(x)
   //  console.log('aaa:'+JSON.stringify(aaa))
   //  console.log(JSON.stringify(aaa))
   //  console.log(aaa)
 })

  useEffect((): void => {
    async function getDividend(account: string) {
      const dividendRes = await api.rpc.xminingasset.getDividendByAccount('5TqDq71XesuCt8YFrXz2MqF1QqpJKYrg5LtCte3KWB7oyEBB');
      let currentDividend: any = '0';

      const userDividend = JSON.parse(dividendRes);
      Object.keys(userDividend).forEach((key: string) => {
        currentDividend = userDividend[key];
      });
      setInterests(Number(currentDividend) / Math.pow(10, 8));
      // setInterests(dividendRes[1])
    }

    getDividend('5TqDq71XesuCt8YFrXz2MqF1QqpJKYrg5LtCte3KWB7oyEBB');
  }, [currentAccount]);

  return (
    <Card>
      <header>
        {/*{interests}*/}
        {interests?.own}
        <p>{t('Cross-chain assets')}</p>
        <hr />
      </header>
      <HeadWrapper>
        <Logo logo={logo}
          name='X-BTC'
          tokenName='Interchain BTC' />
        {props.buttonGroup}
      </HeadWrapper>
      {props.children}
      <Hr />
      <Footer>
        <div>
          <span>{t('Mining interest')}</span>
          <span>  {interests ? interests : 0} PCX</span>
        </div>
        <div>
          <FooterWithdrawal interests={interests}/>
        </div>
      </Footer>
    </Card>
  );
}
