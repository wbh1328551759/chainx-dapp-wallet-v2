
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  padding: 4px 0 0 15.5px;

  & > div.info {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  }

  & > div.button {
    margin-top: 12px;
    > div {
      width: 100%;
      border-radius: 20px;
      padding: 0;
      background: rgba(255, 174, 0);
      color: white;
      font-size: 0.875rem;
      &:hover{
        background: rgba(255, 165, 0);
      }
      &:active{
        background: rgba(255, 153, 0);
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

export default Wrapper;
