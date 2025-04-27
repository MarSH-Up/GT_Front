import React, { useState } from 'react';
import { Box, Button, Grid2, Fade, Slide } from '@mui/material';
import { UserLogin } from '../components/UserLogin';
import { AdminLogin } from '../components/AdminLogin';
import background from '../assets/users.jpg';

const Login: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const handleToggle = () => setIsAdmin((prev) => !prev);

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
          {/* Container for slides with absolute positioning */}
          <Box sx={{ position: 'relative', flex: 1 }}>
            {/* Slide in form */}
            <Slide
              direction='left'
              in={!isAdmin}
              mountOnEnter
              unmountOnExit
              timeout={500}
            >
              <Box sx={{ position: 'absolute', width: '100%', top: 0 }}>
                <UserLogin />
              </Box>
            </Slide>

            <Slide
              direction='right'
              in={isAdmin}
              mountOnEnter
              unmountOnExit
              timeout={500}
            >
              <Box sx={{ position: 'absolute', width: '100%', top: 0 }}>
                <AdminLogin />
              </Box>
            </Slide>
          </Box>

          {/* Toggle Button */}
          <Fade in timeout={500}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                onClick={handleToggle}
                variant='outlined'
                color='primary'
                sx={{
                  zIndex: 1000,
                  mt: 4,
                  textTransform: 'none',
                  width: 'fit-content',
                  minWidth: '8rem',
                  maxWidth: '8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '12px',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                  },
                  fontSize: '1rem',
                }}
              >
                {isAdmin ? 'Usuario' : 'Administrador'}
              </Button>
            </Box>
          </Fade>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default Login;
