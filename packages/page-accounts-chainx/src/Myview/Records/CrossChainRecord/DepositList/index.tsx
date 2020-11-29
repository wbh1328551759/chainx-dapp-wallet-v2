import React, { useContext } from 'react';

import Empty from '../../Empty';
import Wrapper from './Wrapper';
import Line from './Line';
import { useTranslation } from '@polkadot/app-accounts/translate';
import useDeposit from '@polkadot/app-accounts-chainx/useDeposit';
import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';


export default function (): React.ReactElement {

  const { t } = useTranslation();
  const { currentAccount } = useContext(AccountContext);
  const deposits = useDeposit(currentAccount);

  const depositsElement = (
    <ul>
      {(deposits || []).map((deposit, index) => {
        return <Line deposit={deposit} key={index} />;
      })}
    </ul>
  );

  return (
    <Wrapper>
      {(deposits || []).length > 0 ? (
        depositsElement
      ) : (
          <div>
            <Empty text={t('No top-up record')} />
          </div>
        )}
    </Wrapper>
  );
}
