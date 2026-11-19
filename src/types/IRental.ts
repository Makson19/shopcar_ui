import type { IPagination } from "./IPagination";
import type { IVehicle } from "./IVehicle";

export interface IRental {
  id: number;
  usuarioId: number;
  veiculoId: number;
  dataInicio: string;
  dataPrevistaDevolucao: string;
  valorTotal: string;
  status: string;
  veiculo: IVehicle;
}

export interface IRentalListPayload {
  status?: 'ativa' | 'finalizada';
  per?: number;
  page?: number;
}

export interface IRentalListResponse {
  data: IRental[];
  pagination: IPagination;
}

export interface IRentalCarPayload {
  veiculoId: number;
  dataInicio: string;
  dataPrevistaDevolucao: string;
}
