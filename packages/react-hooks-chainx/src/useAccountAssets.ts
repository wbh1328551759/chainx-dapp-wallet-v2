
import { useEffect, useState } from "react";
import { AssetsList, AssetsInfo } from "./types";
import useApi from "./useApi";
import useIsMountedRef from './useIsMountedRef';

export default function useAccountAssets(accounts: string[]) {
  const mountedRef = useIsMountedRef();
  console.log('use account init ')
  const [state, setState] = useState<AssetsList>({
    allAssets: [],
    isFinished: false
  });
  const { api } = useApi();
  const allAssets: AssetsInfo[] = [];


  useEffect((): void => {
    async function getAssets(accounts: string[]) {

      console.log('get asests' + (accounts.length > 0 ? accounts[0] : '33'))

      accounts.map(async (account, index) => {
        const res = await api.rpc.xassets.getAssetsByAccount(account);

        let current: any = {};
        const userAssets = JSON.parse(res);

        Object.keys(userAssets).forEach((key: string) => {
          current = userAssets[key] as AssetsInfo;
        });

        // get mining interests
        const dividendRes = await api.rpc.xminingasset.getDividendByAccount(
          account
        );
        let currentDividend: any = "0";
        const userDividend = JSON.parse(dividendRes);

        Object.keys(userDividend).forEach((key: string) => {
          currentDividend = userDividend[key];
        });

        if (JSON.stringify(current) === "{}") {
          current = {
            Locked: "0",
            Reserved: "0",
            ReservedDexSpot: "0",
            ReservedWithdrawal: "0",
            Usable: "0"
          } as AssetsInfo;
        }

        current = Object.assign(current, {
          account: account,
          assetName: "X-BTC",
          XbtcInterests: currentDividend
        });
        allAssets.push(current);
        console.log(JSON.stringify(allAssets))
      })
      setState({ allAssets: allAssets, isFinished: false });
    }

    getAssets(accounts);
  }, [mountedRef, (accounts.length > 0 ? accounts[0] : '33')]);

  return state;
}
