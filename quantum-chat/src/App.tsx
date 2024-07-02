import Navbar from './components/Navbar';
import Home from './components/Home';
import BlogDetails from './components/BlogDetails';
import Create from './components/Create';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import React from 'react';

function App() {

  // const title = 'Welcome to the new blog';

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
