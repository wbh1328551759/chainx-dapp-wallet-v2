
import React from 'react';
import { Header } from './Wrapper';
import { useTranslation } from '../translate';

type Props = {
  idx: number,
  setIdx: any
}

export default function ({ idx, setIdx }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  return (
    <Header>
      <ul>
        <li className={idx === 0 ? 'active' : undefined}
          onClick={() => setIdx(0)}>
          {t('Open Orders')}
        </li>
        <li className={idx === 1 ? 'active' : undefined}
          onClick={() => setIdx(1)}>
          {t('Order History')}
        </li>
      </ul>
    </Header>
  );
}
