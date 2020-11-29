//[object Object]
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
export type AccountFilter = 'all' | 'controller' | 'session' | 'stash' | 'unbonded';

export type ValidatorFilter = 'all' | 'hasNominators' | 'noNominators' | 'hasWarnings' | 'noWarnings' | 'iNominated' | 'nextSet';

export interface ValidatorInfo {
  account: string,
  registeredAt: string,
  isChilled: boolean,
  totalNomination: number,
  lastTotalVoteWeight: string,
  lastTotalVoteWeightUpdate: string,
  isValidating: boolean,
  referralId: string,
  selfBonded: string,
  rewardPotAccount: string,
  rewardPotBalance: number
}

export interface UserNominationInfo {
  account: string,
  vote: string,
  interest: string,
}

export interface Validators {
  validatorlist: ValidatorInfo[]
}

interface ValidatorInfoRank {
  rankBondOther: number;
  rankBondOwn: number;
  rankBondTotal: number;
  rankComm: number;
  rankActiveComm: number;
  rankOverall: number;
  rankPayment: number;
  rankReward: number;
}

export type TargetSortBy = keyof ValidatorInfoRank;

export interface SortedTargets {
  calcWith?: BN;
  lastReward?: BN;
  nominators?: string[];
  setCalcWith: (amount?: BN) => void;
  toggleFavorite: (accountId: string) => void;
  totalStaked?: BN;
  validators?: ValidatorInfo[];
}
