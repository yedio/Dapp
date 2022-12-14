import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Main from "./Main";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}
