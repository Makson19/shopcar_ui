export interface IUserPayload {
  nome: string;
  email: string;
  senha: string;
}

export interface IUserResponse {
  id: number;
  nome: string;
  email: string;
  dataCadastro: string;
}

