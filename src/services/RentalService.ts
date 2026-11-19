import api from '../api/api';
import type { IRentalCarPayload, IRentalListPayload } from '../types/IRental';

class RentalService {
  async findMany(params?: IRentalListPayload) {
    const response = await api.get('/locacoes', { params });
    return response.data;
  }

  async finish(id: number) {
    const response = await api.patch(`/locacoes/${id}/finalizar`);
    return response.data;
  }

  async rent(data: IRentalCarPayload) {
    const response = await api.post('/locacoes', data);
    return response.data;
  }
}

export default new RentalService();
