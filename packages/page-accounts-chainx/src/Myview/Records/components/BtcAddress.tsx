
import React from 'react';
// import { useSelector } from 'react-redux'
// import { networkSelector } from '../../../../reducers/settingsSlice'
// import { btcMainNetHost, btcTestNetHost } from '../../../../services/api'
import LinkWrapper from './LinkWrapper';
import link from './link.svg';
import linkHighlight from './link-highlight.svg';

export default function ({ address = '', length = 5 }) {
  // const network = useSelector(networkSelector)
  // const host = network === 'testnet' ? btcTestNetHost : btcMainNetHost
  // const url = `${host}address/${address}`

  let result = address;

  if (address.length > 2 * length) {
    result =
      address.substring(0, 5) + '...' + address.substring(address.length - 5);
  }
  const url = `https://live.blockcypher.com/btc/address/${address}`
  return (
    <LinkWrapper href={url} target='_blank'>
      <span title={address}>{result}</span>
      <img alt='link'
        className='link'
        src={link} />
      <img
        alt='link-highlight'
        className='link-highlight'
        src={linkHighlight}
      />
    </LinkWrapper>
  );
}
