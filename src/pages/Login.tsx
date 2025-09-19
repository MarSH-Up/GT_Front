import React from 'react';
import { Box, Grid2 } from '@mui/material';
import { UserLogin } from '../components/UserLogin';
import background from '../assets/users.jpg';

const Login: React.FC = () => {

  return (
    <Grid2
      container
      sx={{
        minWidth: '100vw',
        height: '100vh',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        position: 'relative',
        backgroundColor: '#f0f0f0',
        overflow: 'hidden',
      }}
    >
      {/* Background side */}
      <Grid2
        size={6}
        sx={{
          background: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Form side */}
      <Grid2
        size={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            px: 4,
            position: 'relative',
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Single login form */}
          <Box sx={{ position: 'relative', flex: 1 }}>
            <UserLogin />
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default Login;
