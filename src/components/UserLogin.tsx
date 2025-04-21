import {
  Typography,
  Box,
  TextField,
  CircularProgress,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Colors } from '../design/theme';
import LoginLogo from '../assets/logofinalGT.png';
import { Formik, Form } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const UserLogin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Correo electrónico inválido')
      .required('El correo electrónico es obligatorio'),
    password: Yup.string()
      .required('La contraseña es obligatoria')
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    console.log(values);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values: { email: string; password: string }) =>
          handleSubmit(values)
        }
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <Box
              sx={{
                height: '90vh',
                maxHeight: '46.9375rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box>
                <Box
                  sx={{
                    maxWidth: '100%',
                    width: '28rem',
                    height: '10rem',
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '4rem',
                  }}
                >
                  <img
                    src={LoginLogo}
                    alt='logo'
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>

                <Typography
                  mt='1.5rem'
                  mb='0.875rem'
                  fontSize='1.5rem' // Aligned font size with AdminLogin
                  fontWeight={700} // Aligned font weight with AdminLogin
                  color={Colors.primary.main}
                >
                  Accede a tu terapia
                </Typography>
                <Typography
                  mb='1.375rem'
                  fontSize='1.25rem' // Aligned font size with AdminLogin
                  fontWeight={500} // Aligned font weight with AdminLogin
                  color={Colors.primary.main}
                >
                  ¡Bienvenido!
                </Typography>
                <Box mb='1rem' mt='0.75rem'>
                  <TextField
                    color='secondary'
                    required
                    fullWidth
                    id='email'
                    name='email'
                    placeholder='Correo electrónico o usuario *'
                    autoComplete='email'
                    sx={{
                      '& input': {
                        p: '0.8125rem 1.0625rem',
                        fontSize: '1.125rem',
                        lineHeight: '100%',
                      },
                    }}
                    value={formik.values.email}
                    onChange={(e) => {
                      formik.setFieldValue('email', e.target.value);
                    }}
                    error={!!formik.errors.email}
                  />
                </Box>
                <Box mb='1rem' mt='0.75rem'>
                  <TextField
                    color='secondary'
                    required
                    fullWidth
                    placeholder='Contraseña *'
                    name='password'
                    type={!showPassword ? 'password' : ''}
                    id='password'
                    autoComplete='password'
                    value={formik.values.password}
                    onChange={(e) => {
                      formik.setFieldValue('password', e.target.value);
                    }}
                    sx={{
                      '& input': {
                        p: '0.8125rem 1.0625rem',
                        fontSize: '1.125rem', // Aligned font size with AdminLogin
                        lineHeight: '100%',
                      },
                    }}
                    error={!!formik.errors.password}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              cursor: 'pointer',
                            }}
                            onMouseEnter={() => setShowPassword(true)}
                            onMouseLeave={() => setShowPassword(false)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </Box>
                        ),
                      },
                    }}
                  />
                </Box>
              </Box>
              <Box>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{
                    zIndex: 1000,
                    mt: 4,
                    textTransform: 'none',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress
                      size='1.25rem'
                      sx={{
                        '& svg': {
                          color: 'white',
                        },
                      }}
                    />
                  ) : (
                    <Typography
                      fontSize={'1.125rem'}
                      sx={{ color: Colors.white }}
                    >
                      Iniciar sesión
                    </Typography>
                  )}
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
