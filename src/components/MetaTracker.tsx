import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useSetRecoilState } from 'recoil';
import { walletAddressAtom } from '../states/atom';

export default function MetaTracker() {
  const { account } = useWeb3React();
  const setWalletAddress = useSetRecoilState(walletAddressAtom);

  useEffect(() => {
    if (account && account !== '') {
      // 로그인 api 연결 및 로그인 상태값 설정
      setWalletAddress(account);
    }
  }, [account]);

  return <div />;
}
