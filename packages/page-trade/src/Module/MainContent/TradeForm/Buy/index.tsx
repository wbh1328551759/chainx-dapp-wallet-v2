import React, {useContext, useEffect, useState} from 'react';
import Wrapper from './Wrapper';
import Free from '../components/Free';
import {AmountInput, Slider} from '@chainx/ui';
import Label from '../components/Label';
import {marks} from '../constants';
import {TxButton} from '@polkadot/react-components';
import {AssetsInfo} from '@polkadot/react-hooks/types';
import {useTranslation} from '../../../../translate';
import {toPrecision} from '../../../../components/toPrecision';
// import useFills from '../../../../hooks/useFills';
import BigNumber from 'bignumber.js';
import {useAccounts} from '@polkadot/react-hooks';
import {api} from '@polkadot/react-api';
import { FillContext } from '../../../FillProvider';

type Props = {
  nodeName: string,
  setNodeName?: React.Dispatch<string>
  assetsInfo: AssetsInfo | undefined;
}

export default function ({assetsInfo, nodeName}: Props): React.ReactElement<Props> {
  // const fills = useFills();
  const { fills } = useContext(FillContext);
  const fillPrice = fills[0]?.price || 0;
  const defaultValue = new BigNumber(toPrecision(fillPrice, 9)).toFixed(7);
  const [price, setPrice] = useState(toPrecision(0, 7));
  const [amount, setAmount] = useState(toPrecision(0, 7));
  const [percentage, setPercentage] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const [disabled, setDisabled] = useState(true);
  const {t} = useTranslation();
  const bgAmount = new BigNumber(amount);
  const bgPrice = new BigNumber(price);
  const volume = new BigNumber((bgAmount.multipliedBy(bgPrice)).toFixed(7));
  useEffect(() => {
    const bgFillPrice = new BigNumber(toPrecision(fillPrice, 9));
    if (fillPrice) {
      setPrice(bgFillPrice.toFixed(7));
    }
  }, [fillPrice]);

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
    const bgAssetsInfoUsable = new BigNumber(toPrecision(Number(assetsInfo?.Usable), 8));
    setMax(bgAssetsInfoUsable.dividedBy(bgPrice).toNumber());
  }, [assetsInfo, price]);

  useEffect(() => {
    async function judgeNet(){
      const testOrMain = await api.rpc.system.properties();
      const testOrMainNum = JSON.parse(testOrMain);
      if (testOrMainNum.ss58Format !== 42) {
        setDisabled(true)
      }
    }
    judgeNet()
  })
  return (
    <Wrapper>
      <div className='info'>
        <Free
          asset='X-BTC'
          free={assetsInfo?.Usable || '0'}
          precision={8}
        />
      </div>

      <div className='price input'>
        {/* <PriceWrapper */}
        {/*  data-tip={t('Max buying price', {price})} */}
        {/* > */}
        <Label htmlFor='buy-price'>{t('Price')}</Label>
        {/*<img alt='info' src={infoIcon} />*/}
        {/* </PriceWrapper> */}
        <div>
          <AmountInput
            id='buy-price'
            onChange={(value) => {
              setPrice((price) => value);
            }}
            precision={7}
            style={{width: 216}}
            tokenName={'BTC'}
            value={price}
          />
        </div>
      </div>
      <div className='amount input'>
        <Label>{t('Quantity')}</Label>
        <AmountInput
          id='buy-amount'
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
          style={{maxWidth: 216}}
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
          setPercentage((percentage) => value);
          const calcMax = ((max*value)/100).toFixed(7);
          setAmount(() => isFinite(Number(calcMax)) ? calcMax : defaultValue);
        }}
        value={percentage}
        valueLabelDisplay='off'
      />
      <div className='volume'>
        <span>{t('Volume')} </span>
        <span>
          {volume.toNumber()? volume.toNumber().toFixed(8): toPrecision(0, 8)} {'BTC'}
        </span>
      </div>
      <div className='button'>
        <div>
          <TxButton
            accountId={nodeName}
            isDisabled={disabled}
            label={t('Buy PCX')}
            params={[0, 'Limit', 'Buy',
              bgAmount.multipliedBy(Math.pow(10, 8)).toNumber(),
              bgPrice.multipliedBy(Math.pow(10, 9)).toNumber()]}
            tx='xSpot.putOrder'
            // onClick={sign}
          />
        </div>

      </div>
    </Wrapper>
  );
}
