import React from "react";
import { isMobile } from "react-device-detect";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";
import { walletAddressAtom } from "../states/atom";

export default function Header() {
  const dapplink = `https://metamask.app.link/dapp/${window.location.host}`;
  const { login, logout } = useAuth();

  const walletAddress = useRecoilValue(walletAddressAtom);

  const connectMeta = () => {
    const checkEthereum = window.ethereum;
    if (checkEthereum) {
      login();
    } else {
      if (isMobile) {
        window.open(dapplink, "_blank");
      } else {
        if (
          window.confirm("Do you want to install Metamask to use the service?")
        ) {
          window.open(
            "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
          );
        }
      }
    }
  };

  return (
    <Wrap>
      <Logo>🍋</Logo>
      {walletAddress ? (
        <WalletWrap>
          <Wallet>{walletAddress}</Wallet>
          <Logout onClick={() => logout()}>Logout</Logout>
        </WalletWrap>
      ) : (
        <WalletMeta type="button" onClick={() => connectMeta()}>
          METAMASK
        </WalletMeta>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 64px;
  background-color: navy;
`;

const Logo = styled.div`
  font-size: 30px;
`;

const Btn = styled.button`
  padding: 10px;
  border-radius: 5px;
  background-color: #f48805;
  color: white;
`;

const WalletMeta = styled(Btn)`
  background-color: #f48805;
  color: white;
`;

const WalletWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const Wallet = styled(Btn)`
  background-color: #f48805;
  color: white;
`;

const Logout = styled(Btn)`
  background-color: #fff;
  color: #f48805;
`;
