import api from '../api/api';
import type { IAuthPayload, IAuthResponse } from '../types/IAuth';

class AuthService {
  async login(data: IAuthPayload): Promise<IAuthResponse> {
    const response = await api.post('/login', data);
    return response.data;
  }
}

export default new AuthService();
