import type { IPagination } from "./IPagination";

export interface IVehiclePayload {
  disponivel?: 'true' | 'false';
  per?: number;
  page?: number;
}

export interface IVehicle {
  ano: number;
  disponivel: boolean;
  id: number;
  marca: string;
  modelo: string;
  placa: string;
  valorDiaria: string;
}

export interface IVehicleResponse {
  data: IVehicle[];
  pagination: IPagination;
}
