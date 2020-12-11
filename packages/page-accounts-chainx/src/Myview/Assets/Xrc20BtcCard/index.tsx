
import React, { useEffect, useState } from 'react';
import AssetCard from '../components/AssetCard';
import logo from './xrc20-btc.svg';
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   fetchXrcBtcBalance,
//   fetchXrcBtcInfo,
//   xrcBtcBalanceSelector
// } from '../../../../reducers/xrcBtcSlice'
import { AssetLine, DetailWrapper } from '../components/common';
// import $t from '../../../../locale'
import AssetView from '../components/AssetView';
import { PrimaryBtn } from '../../components';
// import { PrimaryButton } from '@chainx/ui';
// import ConvertDialog from './ConvertDialog'
// import { accountIdSelector } from '../../../selectors/assets'

export default function () {
  const meta = {
    name: 'XRC20-BTC',
    tokenName: 'ChainX XRC20 BTC',
    precision: 8
  };

  // const balance = useSelector(xrcBtcBalanceSelector)

  // const accountId = useSelector(accountIdSelector)
  const [dialogOpen, setDialogOpen] = useState(false);

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchXrcBtcBalance(accountId))
  //   dispatch(fetchXrcBtcInfo())
  // }, [dispatch, accountId])

  const footer = (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <PrimaryBtn
        onClick={() => setDialogOpen(true)}
        style={{ marginRight: 8 }}
      >
        划转
      </PrimaryBtn>
    </div>
  );

  return (
    <AssetCard
      footer={footer}
      logo={logo}
      // details={{ free: balance }}
      meta={meta}
    >
      <DetailWrapper>
        <AssetLine>
          <AssetView
            title='总余额'
          // value={balance}
          // precision={meta.precision}
          />
        </AssetLine>
      </DetailWrapper>
      {/* {dialogOpen && <ConvertDialog handleClose={() => setDialogOpen(false)} />} */}
    </AssetCard>
  );
}
