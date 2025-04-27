import axios from 'axios';
import { LoginDto } from '../redux/gt/gt.action';
import { setLocalStorage } from '../utils/localStorage';

const baseURL =
  import.meta.env.VITE_REACT_APP_API || 'http://localhost:3000/api';

const _authService = {
  login: async (data: LoginDto) => {
    const response = await axios.post(`${baseURL}/auth/login`, data);

    const token = response.data.token;
    setLocalStorage('token', token);

    return response.data;
  },
};

export default _authService;
