
import React, { useRef, useEffect, useState, useReducer } from 'react';
import Register from './modals/register';
import styled from 'styled-components';
import { KeyringAddress } from '@polkadot/ui-keyring/types';
import { Table, Button, Spinner } from '@polkadot/react-components';
import { useApi, useToggle, useAccounts, useCall } from '@polkadot/react-hooks';
import { useNomination } from '@polkadot/react-hooks-chainx';
import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';
import Nomination from './Nomination';
import { ValidatorInfo } from '../types';
import { useTranslation } from '../translate';
import { isJSON } from '../util'

interface Props {
  account: KeyringAddress;
  className?: string;
}

const Wrapper = styled.div`
  display: flex;
  justify-content:space-between;
  align-items:center;
  height:100px;
`;


let validatorNames: string[] = [];

function getSortList(validatorInfoList: ValidatorInfo[]) {

  let validating = validatorInfoList.filter(item => JSON.stringify(item.isValidating) === 'true')
  validating = validating.sort((a, b) => {
    return Number(BigInt(b.totalNomination) - BigInt(a.totalNomination))

  })
  let candidate = validatorInfoList.filter(item => JSON.stringify(item.isValidating) === 'false' && JSON.stringify(item.isChilled) === 'false')
  candidate = candidate.sort((a, b) => {
    return Number(BigInt(b.totalNomination) - BigInt(a.totalNomination))
  })
  let chill = validatorInfoList.filter(item => JSON.stringify(item.isValidating) === 'false' && JSON.stringify(item.isChilled) === 'true')
  chill = chill.sort((a, b) => {
    return Number(BigInt(b.totalNomination) - BigInt(a.totalNomination))
  })
  const sortList = []
  sortList.push(...validating)
  sortList.push(...candidate)
  sortList.push(...chill)
  return sortList;
}


function OverView({ className = '' }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();
  const [isLoading, setLoading] = useState<boolean>(true);
  const { allAccounts } = useAccounts();
  const [validatorList, setValidatorList] = useState<ValidatorInfo[]>([]);
  const { allDividended } = useNomination(allAccounts);
  const [isRegisterOpen, toggleRegister] = useToggle();
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  async function getValidator() {
    setLoading(true);
    const validators = await api.rpc.xstaking.getValidators();
    let validatorInfoList: ValidatorInfo[] = JSON.parse(validators);
    validatorInfoList = getSortList(validatorInfoList);
    setValidatorList(validatorInfoList);
    setLoading(false);
  }

  useEffect((): void => {
    getValidator()
  }, [forceUpdate])

  const headerRef = useRef([
    [t<string>('Validator'), 'start'],
    [t<string>('Validator Name')],
    [t<string>('Validator Type')],
    [t<string>('own stake')],
    [t<string>('Other stake')],
    [t<string>('Total prize pool')],
    [t<string>('Option')]
  ]);

  return (
    <div>
      {
        isLoading ? <Spinner /> : (<div>
          {
            <div className={className}>
              {isRegisterOpen && (
                <Register
                  nodeslist={validatorNames}
                  onClose={toggleRegister}
                  onSuccess={(status) => {
                    //forceUpdate()
                  }}
                />
              )}

              <Wrapper>

                <Button.Group>
                  <Button
                    icon='plus'
                    label={t<string>('Register Node')}
                    onClick={toggleRegister}
                  />

                </Button.Group>
              </Wrapper>
              <Table
                empty={!isLoading || (!isLoading && validatorList)}
                header={headerRef.current}
              >
                {
                  validatorList.length > 0 ? (
                    validatorList.map((validator: ValidatorInfo): React.ReactNode => (
                      <Nomination
                        validatorNames={validatorNames}
                        className={className}
                        userInfo={allDividended}
                        validatorInfo={validator}
                        onStatusChange={(status) => {
                          forceUpdate()
                        }}
                      />
                    ))) : null
                }

              </Table>
            </div>

          }
        </div>)
      }
    </div>

  );
}

export default React.memo(styled(OverView)`

  
  .filter--tags {
    .ui--Dropdown {
      padding-left: 0;

      label {
        left: 1.55rem;
      }
    }
  }
`);
