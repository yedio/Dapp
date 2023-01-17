import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useSetRecoilState } from 'recoil';
import { walletAddressAtom } from '../states/atom';
import useAuth from '../hooks/useAuth';

export default function MetaTracker() {
  const { account } = useWeb3React();
  const localAccount = window.localStorage.getItem('account');
  const setWalletAddress = useSetRecoilState(walletAddressAtom);
  const { login } = useAuth();

  useEffect(() => {
    if (account && account !== '') {
      // 로그인 api 연결 및 로그인 상태값 설정
      setWalletAddress(account);
      window.localStorage.setItem('account', account);
    }
  }, [account]);

  useEffect(() => {
    // 새로고침시 로그인 풀림 방지
    if (localAccount !== null) {
      // Web3 account 현재계정 업데이트
      login();
    }
  }, []);

  return <div />;
}
