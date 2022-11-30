import { QRCodeSVG } from "qrcode.react";
import React from "react";
import { useRecoilState } from "recoil";
import { qrKlipValueAtom } from "../../atom/atom";
import Modal from "../Modal";

export default function ModalQrKlip() {
  const qrKlipValue = useRecoilState(qrKlipValueAtom);
  return (
    <Modal>
      <QRCodeSVG value={qrKlipValue} size={400} />
    </Modal>
  );
}
