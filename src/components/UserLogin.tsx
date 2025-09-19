import {
  Typography,
  Box,
  TextField,
  CircularProgress,
  Button,
  InputAdornment,
} from '@mui/material';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Colors } from '../design/theme';
import LoginLogo from '../assets/logofinalGT.png';
import { Formik, Form, FormikHelpers } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import RoutesEnum from '../types/routes.enum';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { userInfo, userLogin } from '../redux/gt/gt.action';
import { UserAccessLevel } from '../redux/gt/gt.slice';
import toast, { Toaster } from 'react-hot-toast';

export const UserLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  const handleSubmit = async (
    values: { email: string; password: string },
    formikBag: FormikHelpers<{ email: string; password: string }>
  ) => {
    setIsLoading(true);
    try {
      const result = await dispatch(userLogin(values));
      
      if (userLogin.fulfilled.match(result)) {
        // Success - show success toast
        toast.success('¡Inicio de sesión exitoso!', {
          duration: 2000,
          position: 'top-center',
          style: {
            background: Colors.primary.main,
            color: Colors.white,
          },
        });
        
        const userInfoResult = await dispatch(userInfo());
        
        if (userInfo.fulfilled.match(userInfoResult)) {
          const user = userInfoResult.payload;
          
          // Navigate based on user access level
          switch (user.userAccessLevel) {
            case UserAccessLevel.ADMIN:
              navigate(RoutesEnum.ADMIN_HOME);
              break;
            case UserAccessLevel.DOCTOR:
            case UserAccessLevel.THERAPIST:
              navigate(RoutesEnum.ADMIN_HOME); // Or create specific routes for doctors/therapists
              break;
            case UserAccessLevel.STUDENT:
              navigate(RoutesEnum.HOME); // Or create specific routes for students
              break;
            case UserAccessLevel.USER:
            default:
              navigate(RoutesEnum.HOME);
              break;
          }
        }
      } else if (userLogin.rejected.match(result)) {
        // Error - clear password and show error toast
        formikBag.setFieldValue('password', '');
        setShowPassword(false);
        
        const errorMessage = (result.payload as { message: string })?.message || 
          'Error durante el inicio de sesión';
        
        toast.error(errorMessage, {
          duration: 4000,
          position: 'top-center',
          style: {
            background: '#f44336',
            color: Colors.white,
          },
        });
      }
    } catch (error) {
      // Clear password on any error
      formikBag.setFieldValue('password', '');
      setShowPassword(false);
      
      toast.error('Error inesperado durante el inicio de sesión', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#f44336',
          color: Colors.white,
        },
      });
      
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Toaster />
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values, formikBag) => handleSubmit(values, formikBag)}
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
                  fontSize='1.5rem'
                  fontWeight={700}
                  color={Colors.primary.main}
                >
                  Accede a tu cuenta
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
                    placeholder='Correo electrónico *'
                    autoComplete='email'
                    sx={{
                      '& input': {
                        p: '0.8125rem 1.0625rem',
                        fontSize: '1.125rem',
                        lineHeight: '100%',
                      },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-1px)',
                          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-1px)',
                          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                        },
                      },
                    }}
                    value={formik.values.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    autoComplete='password'
                    value={formik.values.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      formik.setFieldValue('password', e.target.value);
                    }}
                    sx={{
                      '& input': {
                        p: '0.8125rem 1.0625rem',
                        fontSize: '1.125rem',
                        lineHeight: '100%',
                      },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-1px)',
                          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-1px)',
                          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                        },
                      },
                    }}
                    error={!!formik.errors.password}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                              }}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </Box>
                          </InputAdornment>
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
                    py: 1.5,
                    textTransform: 'none',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${Colors.primary.main} 0%, ${Colors.primary.dark || '#1976d2'} 100%)`,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.25)',
                      background: `linear-gradient(135deg, ${Colors.primary.dark || '#1976d2'} 0%, ${Colors.primary.main} 100%)`,
                    },
                    '&:active': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                    },
                    '&:disabled': {
                      background: '#e0e0e0',
                      color: '#9e9e9e',
                      transform: 'none',
                      boxShadow: 'none',
                    },
                  }}
                  disabled={isLoading}
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
