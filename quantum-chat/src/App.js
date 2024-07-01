import Navbar from './Navbar';
import Home from './Home';
import BlogDetails from './BlogDetails';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {

  // const title = 'Welcome to the new blog';

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;