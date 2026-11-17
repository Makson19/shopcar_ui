import type { IPagination } from "./IPagination";

export interface IVehicleListPayload {
  disponivel?: 'true' | 'false';
  per?: number;
  page?: number;
}

export interface IVehiclePayload {
  marca: string;
  modelo: string;
  placa: string;
  ano: number;
  valorDiaria: number;
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
