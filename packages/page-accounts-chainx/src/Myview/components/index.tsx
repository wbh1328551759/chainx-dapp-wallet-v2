
import styled from 'styled-components';

export const Label = styled.label`
  opacity: 0.32;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0.12px;
  line-height: 20px;
`;

export const Value = styled.span`
  opacity: 0.72;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0.12px;
  line-height: 20px;
`;

export const BtnLists = styled.button`
  color: rgba(0, 0, 0, 0.87);
  border: 1px solid rgba(0,0,0,0.04);
  padding: 1px 2em;
  font-size: 0.875rem;
  min-width: 64px;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-family: Cairo, Arial, sans-serif;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 14px;
  text-transform: none;
  cursor: pointer;
  &:hover {
    background-color: #d5d5d5;
  }
`;


export const WhiteBtn = styled(BtnLists)`
  color: rgba(0,0,0,0.72);
  background: #FFFFFF;
  &:hover {
    background: #E8E9EA;
  }
`;

export const PrimaryBtn = styled(BtnLists)`
  color: rgba(0, 0, 0, 0.7);
  background-color: #F6C94A;
  &:hover {
    background-color: #E7BD45;
  }
`;

export const DefaultBtn = styled(BtnLists)`
  color: rgba(0, 0, 0, 0.7);
  background-color: #F2F3F4;
  &:hover {
    background-color: #E8E9EA;
  }
`;