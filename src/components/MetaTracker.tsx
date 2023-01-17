import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import { useSetRecoilState } from 'recoil';
import { walletAddressAtom } from '../states/atom';
import useAuth from '../hooks/useAuth';

export default function MetaTracker() {
  const { account, deactivate } = useWeb3React();
  const { login, logout } = useAuth();
  const localAccount = window.localStorage.getItem('account');
  const setWalletAddress = useSetRecoilState(walletAddressAtom);

  const getLoginInfo = async () => {
    const message = JSON.stringify({ method: 'LOGIN' });
    const sig = await signMessage({ message, account });

    if (account && sig) {
      // login api 연결 및 login process 진행.
      setWalletAddress(account);
      window.localStorage.setItem('account', account);
    }
  };

  const signMessage = async ({ message, account }: any) => {
    try {
      const provider = new providers.Web3Provider(window.ethereum); // provider 생성
      const signer = provider.getSigner(account); // 메타마스크에 선택된 지갑으로 서명을 함.
      const signature = await signer.signMessage(message);
      const address = await signer.getAddress();

      return {
        signature,
        address,
      };
    } catch (err: any) {
      console.log('signMessage-err', err);
      deactivate();
    }
  };

  useEffect(() => {
    if (account && account !== '') {
      if (!localAccount) {
        // 로그인 되어있지 않을 때만 서명값 요청
        getLoginInfo();
      } else {
        if (localAccount !== account) {
          // 로그인된 지갑주소와 현재 연결되어있는 지갑주소가 다를 때.
          window.alert(
            'Your wallet account has been changed. Please login again.'
          );
          logout();
        } else {
          // 새로고침시 로그인 풀림 방지
          setWalletAddress(account);
        }
      }
    }
  }, [account]);

  useEffect(() => {
    if (localAccount !== null) {
      // Web3 account 현재계정 업데이트
      login();
    }
  }, []);

  return <div />;
}
