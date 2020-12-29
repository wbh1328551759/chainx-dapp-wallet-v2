import React, { useCallback, useContext, useState} from 'react';
import Row from '@polkadot/react-components/Row';
import {toShortAddress} from '@polkadot/react-components/util';
import {DEFAULT_ADDR, Props} from '@polkadot/react-components/AddressRow';
import {useAccountInfo, useApi, useCall, useToggle} from '@polkadot/react-hooks';
import IdentityIcon from '@polkadot/react-components/IdentityIcon';
import BaseIdentityIcon from '@polkadot/react-identicon';
import {Forget, Icon, Menu, Popup, StatusContext} from '@polkadot/react-components';
import {AccountWrapper} from './Wrapper'
import {createMenuGroup} from '@polkadot/app-accounts-chainx/util';
import {ThemeDef} from '@polkadot/react-components/types';
import {ThemeContext} from 'styled-components';
import {useTranslation} from '@polkadot/app-accounts-chainx/translate';
import {SubmittableExtrinsic} from '@polkadot/api/types';
import BN from 'bn.js';
import {getLedger} from '@polkadot/react-api';
import {KeyringAddress} from '@polkadot/ui-keyring/types';
import {Delegation} from '@polkadot/app-accounts-chainx/types';
import {ProxyDefinition, RecoveryConfig} from '@polkadot/types/interfaces';
import useMultisigApprovals from '@polkadot/app-accounts-chainx/Accounts/useMultisigApprovals';
import {Option} from '@polkadot/types';
import Backup from '@polkadot/app-accounts-chainx/modals/Backup';
import DelegateModal from '@polkadot/app-accounts-chainx/modals/Delegate';
import Derive from '@polkadot/app-accounts-chainx/modals/Derive';
import Withdraw from '@polkadot/app-accounts-chainx/modals/withdraw';
import XbtcTransfer from '@polkadot/app-accounts-chainx/modals/XBTCTransfer';
import IdentityMain from '@polkadot/app-accounts-chainx/modals/IdentityMain';
import IdentitySub from '@polkadot/app-accounts-chainx/modals/IdentitySub';
import ChangePass from '@polkadot/app-accounts-chainx/modals/ChangePass';
import Transfer from '@polkadot/app-accounts-chainx/modals/Transfer';
import Deposite from '../../../modals/deposite/deposite';
import ProxyOverview from '@polkadot/app-accounts-chainx/modals/ProxyOverview';
import MultisigApprove from '@polkadot/app-accounts-chainx/modals/MultisigApprove';
import RecoverAccount from '@polkadot/app-accounts-chainx/modals/RecoverAccount';
import RecoverSetup from '@polkadot/app-accounts-chainx/modals/RecoverSetup';
import UndelegateModal from '@polkadot/app-accounts-chainx/modals/Undelegate';
import useXbtcAssets from '@polkadot/app-accounts-chainx/Myview/useXbtcAssets';
import {ActionStatus} from '@polkadot/react-components/Status/types';
import keyring from '@polkadot/ui-keyring';
import {useLocalStorage} from '@polkadot/react-hooks-chainx';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';

const ICON_SIZE = 36;

interface DemocracyUnlockable {
  democracyUnlockTx: SubmittableExtrinsic<'promise'> | null;
  ids: BN[];
}

interface AccountProps extends Props{
  account: KeyringAddress;
  className?: string;
  delegation?: Delegation;
  proxy?: [ProxyDefinition[], BN];
}

const transformRecovery = {
  transform: (opt: Option<RecoveryConfig>) => opt.unwrapOr(null)
};

function Account({account: {address, meta}, proxy, delegation, buttons, children, className, defaultName, fullLength = false, isContract = false, isDisabled, isEditableName, isInline, isValid: propsIsValid, overlay, withTags = false}: AccountProps): React.ReactElement<AccountProps> | null {
  const {t} = useTranslation();
  const api = useApi();
  const {flags: {isDevelopment, isExternal, isHardware, isInjected, isMultisig, isProxied}, accountIndex, isNull, name, onSaveName, onSaveTags, setName, setTags, identity, tags} = useAccountInfo(address ? address.toString() : null, isContract);
  const isValid = !isNull && (propsIsValid || address || accountIndex);
  const InfoIcon = address ? IdentityIcon : BaseIdentityIcon;
  const newAddress = address && isValid ? address : DEFAULT_ADDR;
  const {theme} = useContext<ThemeDef>(ThemeContext);
  const [isSettingsOpen, toggleSettings] = useToggle();
  const [isDepositeOpen, toggleDeposite] = useToggle();
  const [isWithdraw, toggleWithdraw] = useToggle();
  const [isXbtcTransfer, toggleXbtcTransfer] = useToggle();
  const [isIdentityMainOpen, toggleIdentityMain] = useToggle();
  const [isIdentitySubOpen, toggleIdentitySub] = useToggle();
  const [{democracyUnlockTx}, setUnlockableIds] = useState<DemocracyUnlockable>({democracyUnlockTx: null, ids: []});
  const [vestingVestTx, setVestingTx] = useState<SubmittableExtrinsic<'promise'> | null>(null);
  const {queueExtrinsic} = useContext(StatusContext);
  const [isDeriveOpen, toggleDerive] = useToggle();
  const [isPasswordOpen, togglePassword] = useToggle();
  const [isBackupOpen, toggleBackup] = useToggle();
  const [isForgetOpen, toggleForget] = useToggle();
  const [isRecoverSetupOpen, toggleRecoverSetup] = useToggle();
  const [isRecoverAccountOpen, toggleRecoverAccount] = useToggle();
  const [isMultisigOpen, toggleMultisig] = useToggle();
  const [isDelegateOpen, toggleDelegate] = useToggle();
  const [isUndelegateOpen, toggleUndelegate] = useToggle();
  const [isProxyOverviewOpen, toggleProxyOverview] = useToggle();
  const recoveryInfo = useCall<RecoveryConfig | null>(api.api.query.recovery?.recoverable, [address], transformRecovery);
  const multiInfos = useMultisigApprovals(address);
  const [n, setN] = useState<number>(0)
  const assetInfo = useXbtcAssets(address, n)
  const [,setValue] = useLocalStorage('currentAccount')
  const {changeAccount} = useContext(AccountContext)


  const _clearDemocracyLocks = useCallback(
    () => democracyUnlockTx && queueExtrinsic({
      accountId: address,
      extrinsic: democracyUnlockTx
    }),
    [address, democracyUnlockTx, queueExtrinsic]
  );

  const _vestingVest = useCallback(
    () => vestingVestTx && queueExtrinsic({
      accountId: address,
      extrinsic: vestingVestTx
    }),
    [address, queueExtrinsic, vestingVestTx]
  );

  const _showOnHardware = useCallback(
    // TODO: we should check the hardwareType from metadata here as well,
    // for now we are always assuming hardwareType === 'ledger'
    (): void => {
      getLedger()
        .getAddress(true, meta.accountOffset as number || 0, meta.addressOffset as number || 0)
        .catch((error): void => {
          console.error(`ledger: ${(error as Error).message}`);
        });
    },
    [meta]
  );

  const _onForget = useCallback(
    (): void => {
      if (!address) {
        return;
      }

      const status: Partial<ActionStatus> = {
        account: address,
        action: 'forget'
      };

      try {
        keyring.forgetAccount(address);
        setValue('')
        changeAccount('')
        status.status = 'success';
        status.message = t<string>('account forgotten');
      } catch (error) {
        status.status = 'error';
        status.message = (error as Error).message;
      }
    },
    [address, t]
  );
  return (
    <AccountWrapper>
      <Row
        address={fullLength ? newAddress : toShortAddress(newAddress)}
        buttons={buttons}
        className={className}
        defaultName={defaultName}
        icon={
          <InfoIcon
            size={ICON_SIZE}
            value={address ? address.toString() : null}
          />
        }
        isDisabled={isDisabled}
        isEditableName={isEditableName}
        isEditableTags
        isInline={isInline}
        name={name}
        onChangeName={setName}
        onChangeTags={setTags}
        onSaveName={onSaveName}
        onSaveTags={onSaveTags}
        tags={withTags && tags}
      >
        {children}
        {overlay}
      </Row>
      {isBackupOpen && (
        <Backup
          address={address}
          key='modal-backup-account'
          onClose={toggleBackup}
        />
      )}
      {isDelegateOpen && (
        <DelegateModal
          key='modal-delegate'
          onClose={toggleDelegate}
          previousAmount={delegation?.amount}
          previousConviction={delegation?.conviction}
          previousDelegatedAccount={delegation?.accountDelegated}
          previousDelegatingAccount={address}
        />
      )}
      {isDeriveOpen && (
        <Derive
          from={address}
          key='modal-derive-account'
          onClose={toggleDerive}
        />
      )}
      {
        isWithdraw && (
          <Withdraw
            account={address}
            btc={assetInfo.Usable}
            onClose={toggleWithdraw}
            setN={setN}
          />
        )
      }
      {
        isXbtcTransfer && (
          <XbtcTransfer
            onClose={toggleXbtcTransfer}
            senderId={address}
            setN={setN}
          />
        )
      }
      {isForgetOpen && (
        <Forget
          address={address}
          key='modal-forget-account'
          onClose={toggleForget}
          onForget={_onForget}
        />
      )}
      {isIdentityMainOpen && (
        <IdentityMain
          address={address}
          key='modal-identity-main'
          onClose={toggleIdentityMain}
        />
      )}
      {isIdentitySubOpen && (
        <IdentitySub
          address={address}
          key='modal-identity-sub'
          onClose={toggleIdentitySub}
        />
      )}
      {isPasswordOpen && (
        <ChangePass
          address={address}
          key='modal-change-pass'
          onClose={togglePassword}
        />
      )}

      {
        isDepositeOpen && (
          <Deposite
            address={address}
            onClose={toggleDeposite}
          />
        )

      }
      {isProxyOverviewOpen && (
        <ProxyOverview
          key='modal-proxy-overview'
          onClose={toggleProxyOverview}
          previousProxy={proxy}
          proxiedAccount={address}
        />
      )}
      {isMultisigOpen && multiInfos && (
        <MultisigApprove
          address={address}
          key='multisig-approve'
          onClose={toggleMultisig}
          ongoing={multiInfos}
          threshold={meta.threshold as number}
          who={meta.who as string[]}
        />
      )}
      {isRecoverAccountOpen && (
        <RecoverAccount
          address={address}
          key='recover-account'
          onClose={toggleRecoverAccount}
        />
      )}
      {isRecoverSetupOpen && (
        <RecoverSetup
          address={address}
          key='recover-setup'
          onClose={toggleRecoverSetup}
        />
      )}
      {isUndelegateOpen && (
        <UndelegateModal
          accountDelegating={address}
          key='modal-delegate'
          onClose={toggleUndelegate}
        />
      )}
      <Popup
        className={`theme--${theme}`}
        isOpen={isSettingsOpen}
        onClose={toggleSettings}
        trigger={
          <Icon icon='ellipsis-h' onClick={toggleSettings}/>
        }
      >
        <Menu
          onClick={toggleSettings}
          text
          vertical
        >
          {createMenuGroup([

            (
              <Menu.Item
                key='xbtc recharge'
                onClick={toggleDeposite}
              >
                {t('XBTC recharge')}
              </Menu.Item>

            ),
            (
              <Menu.Item
                key='xbtc withdraw'
                onClick={toggleWithdraw}
              >
                {t('XBTC withdrawals')}
              </Menu.Item>
            ),
            (
              <Menu.Item
                key='xbtc transfer'
                onClick={toggleXbtcTransfer}
              >
                {t('XBTC Transfer')}
              </Menu.Item>
            ),
            api.api.tx.identity?.setIdentity && (
              <Menu.Item
                key='identityMain'
                onClick={toggleIdentityMain}
              >
                {t('Set on-chain identity')}
              </Menu.Item>
            ),
            api.api.tx.identity?.setSubs && identity?.display && (
              <Menu.Item
                key='identitySub'
                onClick={toggleIdentitySub}
              >
                {t('Set on-chain sub-identities')}
              </Menu.Item>
            ),
            api.api.tx.democracy?.unlock && democracyUnlockTx && (
              <Menu.Item
                key='clearDemocracy'
                onClick={_clearDemocracyLocks}
              >
                {t('Clear expired democracy locks')}
              </Menu.Item>
            ),
            api.api.tx.vesting?.vest && vestingVestTx && (
              <Menu.Item
                key='vestingVest'
                onClick={_vestingVest}
              >
                {t('Unlock vested amount')}
              </Menu.Item>
            )
          ])}
          {createMenuGroup([
            !(isExternal || isHardware || isInjected || isMultisig) && (
              <Menu.Item
                key='deriveAccount'
                onClick={toggleDerive}
              >
                {t('Derive account via derivation path')}
              </Menu.Item>
            ),
            isHardware && (
              <Menu.Item
                key='showHwAddress'
                onClick={_showOnHardware}
              >
                {t('Show address on hardware device')}
              </Menu.Item>
            )
          ])}
          {createMenuGroup([
            !(isExternal || isInjected || isMultisig || isDevelopment) && (
              <Menu.Item
                key='backupJson'
                onClick={toggleBackup}
              >
                {t('Create a backup file for this account')}
              </Menu.Item>
            ),
            !(isExternal || isInjected || isMultisig || isDevelopment) && (
              <Menu.Item
                key='changePassword'
                onClick={togglePassword}
              >
                {t('Change this account\'s password')}
              </Menu.Item>
            ),
            !(isInjected || isDevelopment) && (
              <Menu.Item
                key='forgetAccount'
                onClick={toggleForget}
              >
                {t('Forget this account')}
              </Menu.Item>
            )
          ])}
          {api.api.tx.recovery?.createRecovery && createMenuGroup([
            !recoveryInfo && (
              <Menu.Item
                key='makeRecoverable'
                onClick={toggleRecoverSetup}
              >
                {t('Make recoverable')}
              </Menu.Item>
            ),
            <Menu.Item
              key='initRecovery'
              onClick={toggleRecoverAccount}
            >
              {t('Initiate recovery for another')}
            </Menu.Item>
          ])}
          {api.api.tx.multisig?.asMulti && isMultisig && createMenuGroup([
            <Menu.Item
              disabled={!multiInfos || !multiInfos.length}
              key='multisigApprovals'
              onClick={toggleMultisig}
            >
              {t('Multisig approvals')}
            </Menu.Item>
          ])}
          {api.api.query.democracy?.votingOf && delegation?.accountDelegated && createMenuGroup([
            <Menu.Item
              key='changeDelegate'
              onClick={toggleDelegate}
            >
              {t('Change democracy delegation')}
            </Menu.Item>,
            <Menu.Item
              key='undelegate'
              onClick={toggleUndelegate}
            >
              {t('Undelegate')}
            </Menu.Item>
          ])}
          {api.api.query.democracy?.votingOf && !delegation?.accountDelegated && createMenuGroup([
            <Menu.Item
              key='delegate'
              onClick={toggleDelegate}
            >
              {t('Delegate democracy votes')}
            </Menu.Item>
          ])}
          {api.api.query.proxy?.proxies && createMenuGroup([
            <Menu.Item
              key='proxy-overview'
              onClick={toggleProxyOverview}
            >
              {proxy?.[0].length
                ? t('Manage proxies')
                : t('Add proxy')
              }
            </Menu.Item>
          ])}
          {/*<ChainLock*/}
          {/*  className='accounts--network-toggle'*/}
          {/*  genesisHash={genesisHash}*/}
          {/*  isDisabled={api.isDevelopment}*/}
          {/*  onChange={onSetGenesisHash}*/}
          {/*/>*/}
        </Menu>
      </Popup>
    </AccountWrapper>
  );
}

export default Account;
