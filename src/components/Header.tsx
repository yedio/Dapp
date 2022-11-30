import React, { useEffect, useRef, useState } from "react";
import { prepare } from "klip-sdk";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { accountAtom, modalOpenAtom, modalTypeAtom } from "../atom/atom";
import connectKaikas from "../logic/wallet/connectKaikas";
import ModalConnect from "./Modal/ModalConnect";
import ModalQrKlip from "./Modal/ModalQrKlip";
import connectKlip from "../logic/wallet/ConnectKlip";

export default function Header() {
  const navigate = useNavigate();

  const [account, setAccount] = useRecoilState(accountAtom);
  const [modalType, setModalType] = useRecoilState(modalTypeAtom);
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenAtom);

  // 새로 오푼!
  window.klaytn?.on("accountsChanged", function (accounts: any) {
    const accountChange = accounts[0];
    if (account && accountChange !== account) {
      console.log("dd");
      window.localStorage.setItem("account3", accountChange);
      setAccount(accountChange);
    }
  });

  return (
    <HeaderWrap>
      <HeaderLogo>🍋</HeaderLogo>
      <HeaderMenuList>
        <HeaderMenu>
          <Connect
            onClick={() => {
              setModalOpen(true);
              setModalType("지갑연결");
            }}
          >
            지갑 연결
          </Connect>
        </HeaderMenu>
        <HeaderMenu>
          {/* <HeaderLink onClick={() => connectKlip()}>Klip</HeaderLink> */}
          {/* <HeaderLink onClick={() => console.log("e")}>Kaikas</HeaderLink> */}
        </HeaderMenu>
        {/* <HeaderMenu>
          <HeaderLink>{window.localStorage.getItem("account")}</HeaderLink>
        </HeaderMenu> */}
      </HeaderMenuList>
      {modalType === "지갑연결" && <ModalConnect />}
      {modalType === "QrKlip" && <ModalQrKlip />}
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: fixed;
  height: 70px;
  width: 100vw;
  padding: 15px 6.2vw;
  z-index: 9999;
`;

const HeaderLogo = styled.span`
  font-size: 30px;
`;

const HeaderMenuList = styled.ul`
  display: flex;
  align-items: center;
  gap: 30px;
  font-weight: 400;
`;

const HeaderMenu = styled.li``;

const Connect = styled.div`
  height: 35px;

  background-image: linear-gradient(
    to right,
    #4776e6 0%,
    #8e54e9 51%,
    #4776e6 100%
  );
  display: block;
  margin: 10px;
  padding: 10px 20px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
`;

const HeaderLink = styled.a`
  cursor: pointer;
  display: flex;
  gap: 10px;

  &.on {
    font-weight: 600;
    text-decoration: underline;
    text-underline-position: under;
  }

  &:hover {
    text-decoration: underline;
    text-underline-position: under;
  }
`;
