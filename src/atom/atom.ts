import { atom } from "recoil";

export const accountAtom = atom({
  key: "accountAtom",
  default: "",
});

export const qrKlipValueAtom = atom({
  key: "qrKlipValueAtom",
  default: "",
});

// modal
export const modalTypeAtom = atom({
  key: "modalTypeAtom",
  default: "",
});

export const modalOpenAtom = atom({
  key: "modalOpenAtom",
  default: false,
});
