import '../styles/App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from './index';
import { HomeAlbum, AddAlbum } from '../pages';
import { useState, useEffect } from 'react';
import { useAlbums } from '../hooks';
function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<HomeAlbum />} />
          <Route exact path='/add-album' element={<AddAlbum />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
