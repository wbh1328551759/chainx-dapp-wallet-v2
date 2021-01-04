import styled from 'styled-components';

const NavWrapper = styled.div`
  background: rgba(255, 255, 255);
  display: flex;
  justify-content: space-between;
  padding-left: 1em;
  padding-right: 1em;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  color: rgba(0,0,0,0.4);
  z-index: 220;
  border-bottom: 1px solid #EFEFEF;

  > .left{
    display: flex;

    > ul{
      display: flex;

      > li{
        position: relative;

        a{
          display: inline-block;
          color: rgba(0,0,0,0.4);
          padding: 1.4em 1em 1.4em 1em;

          &:hover, &:focus{
            color: rgba(0,0,0,0.8);
            cursor: pointer;
          }
        }

        &:first-child{
          margin-left: 1.7em;
        }

        &.staking, &.developer, &.governance{
          margin-right: 1em;

          a{
            padding-right: 0;
          }
        }

        > svg, img{
          margin-left: 0.3em;
        }

        > .selector{
          font-size: 14px;
          position: absolute;
          width: 11.5em;
          left: -0.7em;
          top: 4.7em;
          display: flex;
          flex-direction: column;
          background: rgba(255,255,255);
          border: 1px solid #EFEFEF;
          box-shadow: 0 4px 12px 0 rgba(63,63,63,0.12);
          border-radius: 8px;

          > a{
            padding: 1em 1em 1em 1.6em;
            color: rgba(0,0,0,0.4);
            &:hover, &:focus{
              color: rgba(0,0,0,0.8);
              cursor: pointer;
            }
          }
        }

        &.linkOutBrowser{
          > a{
            display: flex;
            align-items: flex-start;
          }
        }

        &.divideLine{
          height: 1.5em;
          margin: auto 1em;
          padding: 0;
          background: rgba(0,0,0,0.3);
          width: 1px;
        }

        &:hover, &:focus{
          color: rgba(0,0,0,0.8);
          cursor: pointer;
        }
      }
    }
  }

  > .right{
    display: flex;
    align-items: center;

    > li{
      margin: 1.4em 1em 1.4em 1em;

      &.switchNode{
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 0.5em 1.3em 0.5em 1.3em;
        background: rgba(249, 249, 249);
        border: 1px solid #EFEFEF;
        border-radius: 18px;

        .netInfo{
          text-transform: capitalize;
          min-width: 5.5rem;
        }

        > div {
          margin-right: 0.5em;

          &.circle{
            height: 0.5em;
            width: 0.5em;
            border-radius: 50%;
            background: rgba(52, 198, 154);
          }
        }

        &:hover, &:focus{
          color: rgba(0,0,0,0.8);
          cursor: pointer;
        }
      }

      &.icon{
        margin: 1.1em 0.6em 1.1em 0.6em;
        display: flex;
        align-items: center;

        a{
          display: flex;
          align-items: center;

          svg{
            color: #8E8E8E;

          }
        }

        &:hover, &:focus{
          cursor: pointer;

          svg{
            color: #282828;
          }
        }
      }

      &.accountSelector{
        margin: 0;
      }
    }
  }
`;

export default NavWrapper;
