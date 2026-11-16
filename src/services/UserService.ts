import api from '../api/api';
import type { IUserPayload, IUserResponse } from '../types/IUser';

class UserService {
  async create(data: IUserPayload): Promise<IUserResponse> {
    const response = await api.post("/usuarios", data)
    return response.data
  }
}

export default new UserService();
