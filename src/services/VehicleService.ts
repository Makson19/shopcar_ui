import api from '../api/api';
import type {
  IVehicle,
  IVehicleListPayload,
  IVehiclePayload,
  IVehicleResponse
} from '../types/IVehicle';

class VehicleService {
  async findMany(params?: IVehicleListPayload): Promise<IVehicleResponse> {
    const response = await api.get('/veiculos', { params });
    return response.data;
  }

  async create(data: IVehiclePayload): Promise<IVehicle> {
    const response = await api.post('/veiculos', data);
    return response.data;
  }
}

export default new VehicleService();
