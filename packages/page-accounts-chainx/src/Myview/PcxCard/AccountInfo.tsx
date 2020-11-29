import React, { useContext } from 'react';
import styled from 'styled-components';
import { useAccountInfo, useAccounts } from '@polkadot/react-hooks';
import { useTranslation } from '@polkadot/app-accounts/translate';
import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  min-height: 72px;
`;

const Title = styled.h5`
  margin: 0;
  opacity: 0.72;
  font-size: 18px;
  color: #000000;
  letter-spacing: 0.1px;
  line-height: 28px;
`;

const BaseRow = styled.p`
  margin: 0;
  opacity: 0.56;
  color: #000000;
`;

const Address = styled(BaseRow)`
  font-size: 14px;
  line-height: 20px;
`;

export default function (): React.ReactElement {
  const { t } = useTranslation();
  const { currentAccount } = useContext(AccountContext);
  const { name } = useAccountInfo(currentAccount);
  const { allAccounts } = useAccounts()
  return (
    <Wrapper>
      <Title>{name || '-'}</Title>
      <Address>{allAccounts && currentAccount || '-'}</Address>
      <div>{t('trust、senator、the node of validate')}</div>
    </Wrapper>
  );
}
