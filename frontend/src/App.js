import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Search from './components/search/Search';
import AddNote from './components/addNote/AddNote';
import AllNotes from './components/allNotes/AllNotes';
import Update from './components/update/Update';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<AllNotes />}/>
          <Route path="/search" element={<Search />} />
          <Route path="/add" element={<AddNote />}/>
          <Route path='/update/:id' element={<Update />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
