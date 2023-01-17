import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import MetaTracker from './components/MetaTracker';
import Main from './pages/Main';

export default function Router() {
  return (
    <BrowserRouter>
      <MetaTracker />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* erw */}
      </Routes>
    </BrowserRouter>
  );
}
