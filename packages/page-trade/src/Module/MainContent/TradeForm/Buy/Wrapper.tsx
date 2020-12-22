
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;

  border-right: 1px solid #eeeeee;
  padding: 4px 15.5px 0 0;

  & > div.info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
     > div.tip{
      position: absolute;
      margin-left: 50%;
      transform: translateX(-50%);
      bottom: -0.4rem;
      font-size: 13px;
      background: rgba(254, 254, 254);
      border: 1px solid #dce0e2;
      box-shadow: 0 4px 12px 0 rgba(0,0,0,0.12);
      border-radius: 6px;
      text-align: center;
      height: 3rem;
      padding-left: 2rem;
      padding-right: 2rem;
      line-height: 3rem;
      white-space: nowrap;

    }
     > div.arrows{
        position: absolute;
        margin-left: 50%;
        bottom: -0.9rem;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 7px 0 7px;
        border-color: rgba(254, 254, 254) transparent transparent transparent;
        box-shadow: 0 4px 12px 0 rgba(0,0,0,0.12);
     }
  }

  & > div.input {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 12px;
  }

  & > .percentage {
    margin-top: 16px;
  }

  & > .volume {
    font-size: 13px;
    color: #3f3f3f;
    line-height: 18px;
    margin: 20px 0 10px;
  }

  & > div.button {
    margin-top: 12px;
    > div {
      width: 100%;
      border-radius: 20px;
      padding: 0;
      background: rgba(52, 198, 154);
      color: white;
      font-size: 0.875rem;
      &:hover{
        background: rgba(48, 186, 144);
      }
      &:active{
        background: rgba(44, 170, 132);
      }
      > button {
        border-radius: 20px;
        width: 100%;
        height: 100%;
        padding-top: 13.5px;
        padding-bottom: 13.5px;
        > svg{
          display: none;
        }
      }
      > button:hover{
        background: none !important;
      }
    }
  }

`;

export const Error = styled.div`
  font-size: 12px;
  color: #de071c;
`;

export default Wrapper;
