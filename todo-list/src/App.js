import React from 'react';
import { Header } from './components/Header/Header';
import { ToDoList } from './components/ToDoList/ToDoList';

import './app.css';

function App() {
  return (
    <>
      <Header />
      <ToDoList />
    </>
  );
}

export default App;
