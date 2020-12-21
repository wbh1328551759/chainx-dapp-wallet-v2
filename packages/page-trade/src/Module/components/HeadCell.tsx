
import styled from 'styled-components';
// import { TableCell } from '@chainx/ui';

export const HeadCell = styled.td`
  height: 24px;
  padding: 0 12px !important;
  opacity: 0.72;
  font-weight: 600 !important;
  font-size: 12px !important;
  color: #000000;
  letter-spacing: 0.2px;
  line-height: 16px;
`;

export const HeadTitle = styled.th`
  height: 24px;
  padding: 0 12px;
  opacity: 0.72;
  font-weight: 600;
  font-size: 12px;
  color: #000000;
  letter-spacing: 0.2px;
  line-height: 16px;
  border-right: 1px solid #EEEEEE;
  border-bottom: 1px solid #EEEEEE;
  background-color: #FAFAFA;
  text-align: left;
  &:last-child {
    border-right: none;
    text-align: right;
  }
`;

export const HeadTitles = styled(HeadTitle)`
  padding: 12px 16px;
`;

export default HeadCell;
