import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import {useAccountInfo, useAccounts, useApi} from '@polkadot/react-hooks';
import {useTranslation} from '@polkadot/app-accounts/translate';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';
import {AssetsInfo} from '@polkadot/react-hooks-chainx/types';

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
  const { api } = useApi();

  const {t} = useTranslation();
  const {currentAccount} = useContext(AccountContext);
  const {name} = useAccountInfo(currentAccount);
  const {allAccounts} = useAccounts();
  const [identify, setIdentify] = useState<string>('')
  useEffect(() => {
    async function getIdentity(account: string): Promise<any> {
      const getStakingNode = await api.rpc.xstaking.getValidators();
      const getTrustNode = await api.rpc.xgatewaycommon.bitcoinTrusteeSessionInfo()
      const stakingNodeList = JSON.parse(getStakingNode);
      const trusteeList = JSON.parse(getTrustNode)
      const trustNodeList = trusteeList.trusteeList
      const validateNode = stakingNodeList.filter((node: any) => account === node.account )
      const trustNode = trustNodeList.filter((node: string) => account === node)
      if(validateNode.length > 0 && trustNode.length > 0){
        setIdentify(t('the node of validate and trust'))
      }else if(validateNode.length > 0){
        setIdentify(t('the node of validate'))
      }else if(trustNode.length > 0){
        setIdentify(t('the node of trust'))
      } else {
        setIdentify('')
      }
    }
    getIdentity(currentAccount)
  }, [currentAccount]);
  return (
    <Wrapper>
      <Title>{name || '-'}</Title>
      <Address>{allAccounts && currentAccount || '-'}</Address>
      <div>{identify}</div>
    </Wrapper>
  );
}
