// import Card from '../../PcxCard/Card'
import styled, { css } from 'styled-components';

export default styled.section`
  border: 1px solid #dce0e2;
  border-radius: 10px;
  padding: 16px;
  background: #fff;

  & > header{
    > p{
      font-size: 20px;
      font-weight: bold;
      text-align: left;
    }
    > hr{
      position: absolute;
      top: 50px;
      left: 0;
      right: 0;
      border: 0.5px solid #eee;
    }
  }

  ${(props) =>
    props.disabled &&
    css`
      background: unset;
    `};

  height: 100%;
  position: relative;

  & > div {
    margin-top: 32px;
  }

  & > hr {
    position: absolute;
    bottom: 60px;
    left: 0;
    right: 0;
    border: 0.5px solid #eee;
  }

  & > footer {
    position: absolute;
    bottom: 0;
    height: 60px;
  }
`;
