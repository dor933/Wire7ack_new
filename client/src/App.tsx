import React from 'react';
import './App.css';
import Main from './Components/Main';
import { GlobalProvider } from './Components/Context/Global';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import { useState } from 'react';
import { useEffect } from 'react';

const App: React.FC = () => {

  const [isAuthenticated, setIsAuthenticated] =useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);


  return (
    <GlobalProvider>
      
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/main" element={<Main  />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>

      </Router>
    </div>
    </GlobalProvider>
  );
};

export default App;