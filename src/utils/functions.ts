import { jwtDecode } from 'jwt-decode';

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const data = JSON.parse(token);
    const decode = jwtDecode(data?.data?.token);
    if (!decode.exp || decode.exp * 1000 <= Date.now()) {
      localStorage.removeItem('token');
      return false;
    }
    return true;
  } catch {
    localStorage.removeItem('token');
    return false;
  }
}
