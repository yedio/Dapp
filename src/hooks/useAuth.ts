import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { walletAddressAtom } from '../states/atom';
import { connectors } from '../utils/web3/web3Connector';
import { setupNetwork } from '../utils/web3/setupNetwork';

const useAuth = () => {
  const { activate, deactivate } = useWeb3React();
  const setWalletAddress = useSetRecoilState(walletAddressAtom);
  const login = useCallback(() => {
    if (connectors.injected) {
      activate(connectors.injected, async (error: Error) => {
        if (error instanceof NoEthereumProviderError) {
          // 지갑이 설치되어있지 않은 경우
        } else if (error instanceof UnsupportedChainIdError) {
          // 지원하지 않는 네트워크일 경우
          const hasSetup = await setupNetwork();
          if (hasSetup) {
            activate(connectors.injected);
          }
        } else if (error instanceof UserRejectedRequestErrorInjected) {
          // 유저가 지갑 연결을 거부한 경우
        } else {
          console.log('otherError', error);
        }
      });
    }
  }, []);

  const logout = useCallback(() => {
    deactivate();
    // logout api 연결 및 로직처리
    setWalletAddress('');
    window.localStorage.removeItem('account');
  }, []);

  return { login, logout };
};

export default useAuth;
