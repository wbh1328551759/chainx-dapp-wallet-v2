import React, { useEffect, useState } from 'react';
import Wrapper from './Wrapper';
import Free from '../components/Free';
import Label from '../components/Label';
import { AmountInput, Slider } from '@chainx/ui';
import { marks } from '../constants';
import { toPrecision } from '../../../../components/toPrecision';
import { TxButton } from '@polkadot/react-components';
import { AssetsInfo } from '@polkadot/react-hooks-chainx/types';
import usePcxFree from '../../../../hooks/usePcxFree';
import { useTranslation } from '../../../../translate';
import useFills from '../../../../hooks/useFills';
import BigNumber from 'bignumber.js';
type Props = {
  nodeName: string,
  setNodeName?: React.Dispatch<string>
  assetsInfo: AssetsInfo | undefined;
}

export default function ({ nodeName }: Props): React.ReactElement<Props> {
  const fills = useFills();
  const defaultValue = new BigNumber(toPrecision(fills[0]?.price, 9)).toFixed(7);
  const [price, setPrice] = useState(toPrecision(1, 7));
  const [disabled, setDisabled] = useState(true);
  const [amount, setAmount] = useState(toPrecision(1, 7));
  const [max, setMax] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const pcxFree = usePcxFree(nodeName);
  const { t } = useTranslation();
  const bgAmount = new BigNumber(amount)
  const bgPrice = new BigNumber(price)

  const volume = new BigNumber((bgAmount.multipliedBy(bgPrice)).toFixed(7));

  useEffect(() => {
    if (fills[0]?.price) {
      setPrice((price) => new BigNumber(toPrecision(fills[0]?.price, 9)).toFixed(7));
    }
  }, [fills[0]?.price]);

  useEffect(() => {
    if (Number(amount) <= 0) {
      setDisabled(true);
    } else if (Number(price) <= 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [amount, price]);

  useEffect(() => {
    const bgPcxFree = new BigNumber(toPrecision(pcxFree.free, 8))
    setMax(Number(bgPcxFree));
  }, [pcxFree.free, price]);


  return (
    <Wrapper>
      <div className='info'>
        <Free asset={'PCX'}
          free={pcxFree.free?.toString()}
          precision={8} />
      </div>
      <div className='price input'>
        {/*<PriceWrapper data-tip={t(`Min selling price：${Number(pcxFree.free)}`)}>*/}
        <Label htmlFor='sell-price'>{t('Price')}</Label>
        {/* <img src={infoIcon} alt="info" /> */}
        {/*</PriceWrapper>*/}

        <AmountInput
          id='sell-price'
          onChange={(value) => {
            setPrice(value);
          }}
          precision={7}
          style={{ maxWidth: 216 }}
          tokenName={'BTC'}
          value={price}
        />
      </div>

      <div className='amount input'>
        <Label>{t('Quantity')}</Label>
        <AmountInput
          id='sell-amount'
          onChange={(value) => {
            if (value > max) {
              setAmount(max.toFixed(7));
              setPercentage(100);
            } else {
              setAmount(value);
              setPercentage((value / max) * 100);
            }
          }}
          precision={7}
          style={{ maxWidth: 216 }}
          tokenName={'PCX'}
          value={amount}
        />
      </div>

      <Slider
        className='percentage'
        marks={marks}
        max={100}
        min={0}
        onChange={(value: number) => {
          const bgMax = new BigNumber(max)
          setPercentage((percentage) => value);
          const calcMax = bgMax.multipliedBy(value).dividedBy(100).toFixed(7);
          setAmount((amount) => isFinite(Number(calcMax)) ? calcMax : defaultValue);

        }}
        value={percentage}
        valueLabelDisplay='off'
      />

      <div className='volume'>
        <span>{t('Volume')} </span>
        <span>
          {volume.toFixed(8)} {'BTC'}
        </span>
      </div>

      <div className='button'>
        <div>
          <TxButton
            accountId={nodeName}
            isDisabled={disabled}
            label={t('Sell PCX')}
            params={[0, 'Limit', 'Sell', bgAmount.multipliedBy(Math.pow(10, 8)), bgPrice.multipliedBy(Math.pow(10, 9))]}
            tx='xSpot.putOrder'
          // onClick={sign}
          />
        </div>
      </div>
    </Wrapper>
  );
}
