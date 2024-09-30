import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useGlobal } from '../Context/Global';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    
    isAuthenticated:boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({isAuthenticated,setIsAuthenticated}) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to the main page if the user is authenticated
    if (isAuthenticated) {
      console.log('User is authenticated');
      navigate('/'); // Imperatively navigate to the main page
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Grid
        container
        style={{
          display: 'flex',
          width: '95%',
          padding: '10px 30px',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(48, 76, 87, 0.10)',
          background: '#F7FBFC',
          margin: '0 auto',
        }}
      >
        <Grid
          container
          item
          xs={6}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <h1>Login</h1>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
