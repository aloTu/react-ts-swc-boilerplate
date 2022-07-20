import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Navigate, Routes, Route, Link} from 'react-router-dom';
import App from '@/pages/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/latest" />} />
        <Route path="/latest" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
