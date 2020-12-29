
import React from 'react';
import link from '../components/link.svg';
import linkHighlight from '../components/link-highlight.svg';
import LinkWrapper from '../components/LinkWrapper';

export default function ({ hash = '', length = 5 }) {
  let result: string = hash
  if (hash.length > 2 * length) {
    result = hash.substring(0, 5) + '...' + hash.substring(hash.length - 5)
  }
  const url = `https://scan.chainx.org/extrinsics/${hash}`

  return (
    <LinkWrapper href={url} target="_blank">
      <span>{result}</span>
      <img className="link" src={link} alt="link" />
      <img
        alt='link-highlight'
        className='link-highlight'
        src={linkHighlight}
      />
    </LinkWrapper>
  );
}
