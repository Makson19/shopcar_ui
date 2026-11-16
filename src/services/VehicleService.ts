import api from '../api/api';
import type { IVehiclePayload, IVehicleResponse } from '../types/IVehicle';

class VehicleService {
  async findMany(params?: IVehiclePayload): Promise<IVehicleResponse> {
    const response = await api.get('/veiculos', { params });
    return response.data;
  }
}

export default new VehicleService();
