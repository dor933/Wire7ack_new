import React from 'react';
import './App.css';
import Main from './Components/Main';
import { GlobalProvider } from './Components/Context/Global';

const App: React.FC = () => {
  return (
    <GlobalProvider>
    <div className="App">
      <Main />
    </div>
    </GlobalProvider>
  );
};

export default App;