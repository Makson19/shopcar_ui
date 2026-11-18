import api from '../api/api';
import type { IRentalListPayload } from '../types/IRental';

class RentalService {
  async findMany(params?: IRentalListPayload) {
    const response = await api.get('/locacoes', { params });
    return response.data;
  }

  async finish(id: number) {
    const response = await api.patch(`/locacoes/${id}/finalizar`);
    return response.data;
  }
}

export default new RentalService();
