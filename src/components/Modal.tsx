import React, { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalOpenAtom, modalTypeAtom } from "../atom/atom";
import styled from "styled-components";

interface Props {
  title?: string;
  width?: number;
  children: React.ReactNode;
  buttonOff?: boolean;
  cancelBtn?: boolean;
  clickSubmit?: () => void;
  clickCancel?: () => void;
  submitBtnText?: string;
  cancelBtnText?: string;
}

export default function Modal({
  title = "",
  width = 480,
  children,
  buttonOff = false,
  cancelBtn = false,
  clickSubmit,
  clickCancel,
  cancelBtnText = "취소",
  submitBtnText = "확인",
}: Props) {
  const modalRef = useRef(document.createElement("div"));

  const modalType = useRecoilValue(modalTypeAtom);
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenAtom);

  const onCancle = () => {
    setModalOpen(false);
    clickCancel && clickCancel();
  };

  const onSubmit = () => {
    clickSubmit ? clickSubmit() : setModalOpen(false);
  };

  useEffect(() => {
    const clickOutside = (e: Event) => {
      const target = e.target as Element;
      const condition = modalRef.current.contains(target);
      if (!condition) {
        onCancle();
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [modalType]);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    }
  }, [modalOpen]);

  return (
    <ModalWrap tabIndex={-1} className={modalOpen ? "on" : "off"}>
      <ModalDialog ref={modalRef} width={width}>
        <ModalClose onClick={onCancle} />
        <ModalContent>
          <ModalHeader className={!title ? "invisible" : ""}>
            <HeaderTitle>{title}</HeaderTitle>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter className={buttonOff ? "invisible" : ""}>
            <BtnGroup>
              <CancelBtn
                className={cancelBtn === true ? "visible" : ""}
                onClick={onCancle}
                cancelBtn={cancelBtn}
                cancelBtnText={cancelBtnText}
              >
                {cancelBtnText}
              </CancelBtn>
              <SubmitBtn cancelBtn={cancelBtn} onClick={onSubmit}>
                {submitBtnText}
              </SubmitBtn>
            </BtnGroup>
          </ModalFooter>
        </ModalContent>
      </ModalDialog>
    </ModalWrap>
  );
}

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  outline: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1040;

  &.off {
    display: none;
  }
`;

const ModalDialog = styled.div<{
  width: number;
}>`
  position: relative;
  width: calc(100vw - 36px);
  max-width: ${(props) => `${props.width}px`};
  height: auto;
  max-height: calc(100vh - 40px);
  top: 50%;
  left: 50%;

  padding: 28px 34px;
  border-radius: 12px;
  background: #feffff;

  outline: 0;
  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  overflow-y: auto;

  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const ModalClose = styled.button`
  position: absolute;
  width: 16px;
  height: 16px;
  top: 24px;
  right: 24px;
  background: url(${"/images/modal/close.svg"}) no-repeat 50% 50%;
  background-size: cover;
  cursor: pointer;

  &.invisible {
    display: none;
  }

  &:hover {
    background: url(${"/images/modal/close_hover.svg"}) no-repeat 50% 50%;
  }

  &:active {
    background: url(${"/images/modal/close_click.svg"}) no-repeat 50% 50%;
  }

  @media (max-width: 760px) {
    width: 16px;
    height: 16px;
  }
`;

const ModalContent = styled.div`
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 34px);
  margin-bottom: 19px;

  &.invisible {
    display: none;
  }
`;

const HeaderTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.9);
`;

const ModalBody = styled.div`
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);

  h4 {
    margin-bottom: 12px;
    font-weight: 500;
  }

  p {
    margin-bottom: 24px;
  }

  img {
    width: 100%;
  }
`;

const ModalFooter = styled.div`
  text-align: right;

  &.invisible {
    display: none;
  }
`;

const BtnGroup = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: right;
  gap: 8px;

  &.invisible {
    display: none;
  }
`;

const SubmitBtn = styled.button<{
  cancelBtn: boolean;
}>`
  display: inline-block;
  height: 32px;
  padding: ${(props) => (props.cancelBtn ? "0 20px" : "0 32px")};

  background: ${({ theme }) => theme.main};
  color: white;
  font-size: 14px;
  text-align: center;
  border-radius: 3px;
`;

const CancelBtn = styled(SubmitBtn)<{ cancelBtnText: string | undefined }>`
  display: none;
  background: #e7e7e7;
  color: rgba(0, 0, 0, 0.9);
  transition: all 0.2s ease;

  &.visible {
    display: inline-block;
  }
`;
