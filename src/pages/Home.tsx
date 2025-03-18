import { Box, Container } from '@mui/material';
import React from 'react'
import logo from '../assets/logofinalGT.png';

const Home: React.FC = () => {
  return (
    <Container sx={{ minHeight: "100%", padding: 0, margin: 0, alignContent: 'center', justifyContent: 'center' }}>

        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={logo}
            alt="Gesture Therapy Logo"
            style={{
              maxWidth: '100%',
              maxHeight: '400px',
              objectFit: 'contain',

            }}
          />
        </Box>
    </Container>
  )
}

export default Home;