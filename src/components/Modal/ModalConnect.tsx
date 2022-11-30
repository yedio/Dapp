import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { modalOpenAtom } from "../../atom/atom";
import ConnectKlip from "../../logic/wallet/ConnectKlip";
import Modal from "../Modal";

export default function ModalConnect() {
  const ConnectorList = ["Kaikas", "Klip", "Dcent"];

  const [modalOpen, setModalOpen] = useRecoilState(modalOpenAtom);

  const [clickedMenu, setClickedMenu] = useState<string>("");

  const onConnect = () => {
    console.log("clickedMenu", clickedMenu);
    if (clickedMenu === "Kaikas") {
    } else if (clickedMenu === "Klip") {
      ConnectKlip();
    }
  };

  const clickSubmit = () => {
    if (clickedMenu) {
      onConnect();
      // setModalOpen(false);
      setClickedMenu("");
    }
  };

  const clickCancel = () => {
    setClickedMenu("");
  };
  return (
    <Modal
      title="지갑 연결"
      cancelBtn={true}
      submitBtnText="연결"
      clickSubmit={clickSubmit}
      clickCancel={clickCancel}
    >
      <ConnectorWrap>
        {ConnectorList.map((data, idx) => (
          <Connector
            key={idx}
            onClick={() => setClickedMenu(data)}
            className={data === clickedMenu ? "on" : ""}
          >
            {data}
          </Connector>
        ))}
      </ConnectorWrap>
    </Modal>
  );
}

const ConnectorWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Connector = styled.div`
  font-size: 20px;
  border: #e5e8eb solid 1px;
  padding: 7px;
  border-radius: 23px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #e5e8eb;
  }

  &.on {
    background-color: ${({ theme }) => theme.main};
    color: white;
  }
`;
