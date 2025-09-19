import axios from 'axios';
import { LoginDto } from '../redux/gt/gt.action';
import { setLocalStorage } from '../utils/localStorage';
import { UserBrief } from '../redux/gt/gt.slice';
import { api, baseURL } from './instance';

class AuthError extends Error {
  status?: number;
  
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'AuthError';
    this.status = status;
  }
}

const _authService = {
  login: async (data: LoginDto) => {
    try {
      // Use the /auth/login endpoint that matches the backend
      const response = await axios.post(`${baseURL}/auth/login`, data);
      
      const token = response.data.token;
      setLocalStorage('token', token);
      
      return token;
    } catch (error: unknown) {
      // Enhanced error handling
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        let message = 'Error de autenticación';
        
        switch (status) {
          case 400:
            // Handle BadRequestException from backend
            const errorMessage = error.response.data?.message;
            if (errorMessage === 'Invalid credentials') {
              message = 'Credenciales incorrectas. Verifica tu email y contraseña.';
            } else if (errorMessage?.includes('deleted')) {
              message = 'Esta cuenta ha sido desactivada. Contacta al administrador.';
            } else {
              message = 'Datos de inicio de sesión inválidos.';
            }
            break;
          case 401:
            message = 'Credenciales incorrectas. Verifica tu email y contraseña.';
            break;
          case 403:
            message = 'No tienes permisos para acceder.';
            break;
          case 404:
            message = 'Usuario no encontrado.';
            break;
          case 429:
            message = 'Demasiados intentos. Intenta nuevamente en unos minutos.';
            break;
          case 500:
            message = 'Error del servidor. Intenta nuevamente más tarde.';
            break;
          default:
            message = error.response.data?.message || 'Error de conexión';
        }
        
        throw new AuthError(message, status);
      } else if (axios.isAxiosError(error) && error.request) {
        throw new AuthError('Sin conexión al servidor. Verifica tu conexión a internet.');
      } else {
        throw new AuthError('Error inesperado durante el inicio de sesión.');
      }
    }
  },
  
  userInfo: async () => {
    try {
      const response = await api.get<UserBrief>(`/user`);
      return response;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new AuthError('Sesión expirada. Por favor, inicia sesión nuevamente.');
      }
      throw new AuthError('Error al obtener información del usuario.');
    }
  },
};

export default _authService;
export { AuthError };