
export interface IAuthPayload {
  email: string;
  senha: string;
}

export interface IAuthResponse {
  data: {
    id: number,
    nome: string,
    email: string,
    token: string
  }  
}
