import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './features/files/pages/Home/Home';
import FileViewPage from './features/files/pages/FileView/FileViewPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/files/:id" element={<FileViewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
