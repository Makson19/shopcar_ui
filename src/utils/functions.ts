import { jwtDecode } from 'jwt-decode';

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const data = JSON.parse(token);
    const decode = jwtDecode(data?.data?.token);
    if (!decode.exp || decode.exp * 1000 <= Date.now()) {
      localStorage.removeItem('token');
      return false;
    }
    return true;
  } catch {
    localStorage.removeItem('token');
    return false;
  }
}

export const formatDiaria = (valor: string) => {
  const numero = Number(valor);
  if (Number.isNaN(numero)) {
    return valor;
  }
  return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const formatDate = (value: string) => {
  if (!value) {
    return '—';
  }

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const [, ano, mes, dia] = match;
    return `${dia}/${mes}/${ano}`;
  }

  const data = new Date(value);
  if (Number.isNaN(data.getTime())) {
    return value;
  }
  return data.toLocaleDateString('pt-BR');
};
