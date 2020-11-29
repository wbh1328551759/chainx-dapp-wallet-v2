
import React from 'react';
import styled from 'styled-components';
import BN from 'bn.js';

const Wrapper = styled.tr`
  color: inherit;
  display: table-row;
  outline: 0;
  vertical-align: middle;
  > th{
    color: rgba(0, 0, 0, 1);
    line-height: 1;
    border-right: 1px solid #EEEEEE;
    background-color: #FAFAFA;
    display: table-cell;
    padding: 12px 16px;
    text-align: left;
    font-family: Cairo, Arial, sans-serif;
    border-bottom: 1px solid #EEEEEE;
    vertical-align: inherit;
    opacity: 0.72;
    letter-spacing: 0.2px;
    font-size: 12px !important;
    font-weight: 600 !important;
    &:last-child{
      text-align: right;
      border-right: none;
    }
  }
  > td{
    display: table-cell;
    padding: 12px 16px;
    font-size: 12px;
    text-align: left;
    font-family: Cairo, Arial, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    border-bottom: 1px solid #EEEEEE;
    vertical-align: inherit;
    opacity: 0.72;
    letter-spacing: 0.2px;
    &.blue{
      color: rgb(70, 174, 226) !important;
      opacity: 1;
      font-weight: 600 !important;
    }
    &.strong{
      rgb(0,0,0);
      font-weight: 600 !important;
    }
    & > a{
      color: inherit !important;
    }
    &:last-child{
      text-align: right;
      color: rgb(0, 0, 0);
      font-weight: 600 !important;
    }
  }
`;

interface Props {
  id: number,
  assetId: number,
  applicant: string,
  balance: number,
  addr: string,
  ext: string,
  height: number,
  state: string
}

export default function ({ addr, applicant, assetId, balance, ext, height, id, state }: Props): React.ReactElement<Props> {
  return (
    <Wrapper>
      <td>{height}</td>
      <td className='blue'> {assetId}</td>
      <td>BTC</td>
      <td className='strong'>{balance} </td>
      <td><a href=''
        target='_blank'>{applicant} </a></td>
      <td><a href=''
        target='_blank'>{addr} </a></td>
      <td>{ext} </td>
      <td>{state}</td>
    </Wrapper>
  );
}
