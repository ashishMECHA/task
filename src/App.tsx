import React from 'react';
import './App.css';
import data from './constants/data.json'
import Table1 from './components/Table1';
import { createTheme, MantineProvider } from '@mantine/core';
import Table2 from './components/Table2';


function App() {
  return (
    
    <MantineProvider>
      <div className="flex_container">
      <Table1/>
      <Table2/>
      </div>
    </MantineProvider>
    
    
  );
}

export default App;
