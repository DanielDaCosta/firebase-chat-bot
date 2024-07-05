import Sidebar from './components/Sidebar/Sidebar';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import React from 'react';
import Main from './components/Main/Main';
import ChatContextProvider from './context/ChatContext';

function App() {

  // const title = 'Welcome to the new blog';

  return (
    <div className="App">
      <ChatContextProvider>
        <Sidebar />
        <Main />
      </ChatContextProvider>
    </div>
  );
}

export default App;
