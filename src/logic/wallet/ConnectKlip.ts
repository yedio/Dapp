import { prepare } from "klip-sdk";
import { useSetRecoilState } from "recoil";
import { modalTypeAtom, qrKlipValueAtom } from "../../atom/atom";

const ConnectKlip = async () => {
  const setQrKlipValue = useSetRecoilState(qrKlipValueAtom);
  const setModalType = useSetRecoilState(modalTypeAtom);
  const bappName = "yejutest";
  const res = await prepare.auth({ bappName });
  const valueKlip = `https://klipwallet.com/?target=/a2a?request_key=${res.request_key}`;
  setQrKlipValue(valueKlip);
  setModalType("QrKlip");
};

export default ConnectKlip;
