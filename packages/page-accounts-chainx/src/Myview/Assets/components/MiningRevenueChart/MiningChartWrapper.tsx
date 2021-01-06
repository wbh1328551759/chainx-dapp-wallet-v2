import styled from 'styled-components';

export const ChainStatus = styled.div`
  flex-direction: column;
  padding: 16px;
  padding-bottom: 0;
  border: 1px solid #DCE0E2;
  margin-left: 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255);
  font-size: 16px;
  color: rgba(0, 0, 0, 0.72);
  width: 30%;
  margin-bottom: 0;
  position: relative;

  p{
    font-size: 14px;
    font-weight: 600;
  }

  > .canvas{
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > .details{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 35px;
    justify-content: space-between;
  }

`;

export const Hr = styled.hr`
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  border: 0.5px solid #eee;
`;
