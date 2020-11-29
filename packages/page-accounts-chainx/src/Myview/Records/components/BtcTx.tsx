
import React from 'react';
import LinkWrapper from './LinkWrapper';
import link from './link.svg';
import linkHighlight from './link-highlight.svg';

export default function ({ hash = '', length = 5 }) {
  // const host = network === 'testnet' ? btcTestNetHost : btcMainNetHost
  // const url = `${host}tx/${hash}`

  let result = hash;

  if (hash.length > 2 * length) {
    result = hash.substring(0, 5) + '...' + hash.substring(hash.length - 5);
  }
  const url = `https://live.blockcypher.com/btc/tx/${hash}`


  return (
    <LinkWrapper href={url} target="_blank">
      <span>{result}</span>
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
