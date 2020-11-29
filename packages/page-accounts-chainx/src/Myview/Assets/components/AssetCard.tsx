import React, { ReactNode, useContext, useEffect, useState } from 'react';
import Card from './CardWrapper';
import Logo from './Logo';
import styled from 'styled-components';
import { useTranslation } from '@polkadot/app-accounts/translate';
import { useApi } from '@polkadot/react-hooks';
import FooterWithdrawal from '@polkadot/app-accounts-chainx/Myview/Assets/components/FooterWithdrawal';
import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';

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

  useEffect((): void => {
    async function getDividend(account: string) {
      const dividendRes = await api.rpc.xminingasset.getDividendByAccount(account);
      let currentDividend: any = '0';
      const userDividend = JSON.parse(dividendRes);

      Object.keys(userDividend).forEach((key: string) => {
        currentDividend = userDividend[key];
      });
      setInterests(Number(currentDividend) / Math.pow(10, 8));
    }

    getDividend(currentAccount);
  }, [currentAccount]);

  return (
    <Card>
      <header>
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
          <FooterWithdrawal />
        </div>
      </Footer>
    </Card>
  );
}
