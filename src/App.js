import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert message="Aakash Sharma's diary!"/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
