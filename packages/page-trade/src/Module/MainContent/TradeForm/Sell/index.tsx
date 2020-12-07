import React, {useContext, useEffect, useState} from 'react';
import Wrapper from './Wrapper';
import Free from '../components/Free';
import Label from '../components/Label';
import {AmountInput, Slider} from '@chainx/ui';
import {marks} from '../constants';
import {toPrecision} from '../../../../components/toPrecision';
import {TxButton} from '@polkadot/react-components';
import usePcxFree from '@polkadot/react-hooks-chainx/usePcxFree';
import {useTranslation} from '../../../../translate';
import useFills from '../../../../hooks/useFills';
import BigNumber from 'bignumber.js';
import {useAccounts} from '@polkadot/react-hooks';
import {api} from '@polkadot/react-api';
import { FillContext } from '../../../FillProvider';
import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';


type Props = {
  nodeName: string,
  setNodeName?: React.Dispatch<string>
}

export default function ({nodeName}: Props): React.ReactElement<Props> {
  const {hasAccounts} = useAccounts();
  const fills = useFills();
  // const { fills } = useContext(FillContext);
  const defaultValue = new BigNumber(toPrecision(fills[0]?.price, 9)).toNumber().toFixed(7);
  const [price, setPrice] = useState<number | string>(toPrecision(0, 7));
  const [disabled, setDisabled] = useState<boolean>(true);
  const [amount, setAmount] = useState<number | string>(toPrecision(0, 7));
  const [max, setMax] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  // const { currentAccount } = useContext(AccountContext);
  const pcxFree = usePcxFree(nodeName);
  console.log("pcxFree:")
  console.log(JSON.parse(JSON.stringify(pcxFree)))
  const {t} = useTranslation();
  const bgAmount = new BigNumber(amount);
  const bgPrice = new BigNumber(price);

  const volume = new BigNumber((bgAmount.multipliedBy(bgPrice)).toFixed(7));

  useEffect(() => {
    if (fills[0]?.price) {
      const bgPrice = new BigNumber(toPrecision(fills[0]?.price, 9));
      setPrice(bgPrice.toNumber().toFixed(7));
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
    const bgPcxFree = new BigNumber(toPrecision(pcxFree.free, 8));
    setMax(Number(bgPcxFree));
  }, [pcxFree.free, price]);

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
        <Free asset={'PCX'}
              free={hasAccounts ? pcxFree.free : Number(toPrecision(0, 7)).toString()}
              precision={8}/>
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
          style={{maxWidth: 216}}
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
          const bgMax = new BigNumber(max);
          setPercentage(value);
          const calcMax = bgMax.multipliedBy(value).dividedBy(100).toFixed(7);
          setAmount(isFinite(Number(calcMax)) ? +calcMax : Number(toPrecision(0,7)).toFixed(7));
        }}
        value={percentage}
        valueLabelDisplay='off'
      />

      <div className='volume'>
        <span>{t('Volume')} </span>
        <span>
          {volume.toNumber() ? volume.toNumber().toFixed(8) : toPrecision(0, 8)} {'BTC'}
        </span>
      </div>

      <div className='button'>
        <div>
          <TxButton
            accountId={nodeName}
            isDisabled={disabled}
            label={t('Sell PCX')}
            params={[0, 'Limit', 'Sell',
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
