import { useEffect, useState } from 'react'
import styled from 'styled-components';
import { MdDirectionsCar, MdKey } from 'react-icons/md';
import Pagination from '../components/Pagination';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Loading from '../components/Loading';
import VehicleService from '../services/VehicleService';
import { useUserContext } from '../contexts/UserContext';
import type { IVehicle, IVehicleListPayload } from '../types/IVehicle';
import type { IPagination } from '../types/IPagination';
import { useNavigate } from 'react-router';

type TDisponivelFilter = 'todos' | 'true' | 'false';

const FILTER_OPTIONS: Array<{ label: string, value: TDisponivelFilter }> = [
  { label: 'Todos', value: 'todos' },
  { label: 'Disponíveis', value: 'true' },
  { label: 'Indisponíveis', value: 'false' },
];

const formatDiaria = (valor: string) => {
  const numero = Number(valor);
  if (Number.isNaN(numero)) {
    return valor;
  }
  return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const HomePageBox = styled.div`
  & > .container {
    margin-inline: auto;
    max-width: 1000px;
    padding: 24px 16px 40px;

    & > .header {
      align-items: center;
      display: flex;
      gap: 8px;
      justify-content: space-between;
    }
  }
`;

const PageHeaderBox = styled.header`
  & > h1 {
    color: #121212;
    font-size: 28px;
    font-weight: 700;
  }

  & > p {
    color: #666666;
    font-size: 15px;
    margin-top: 4px;
  }
`;

const PanelBox = styled.section`
  background: #FFFFFF;
  border: 1px solid #E8ECF2;
  border-radius: 8px;
  margin-top: 24px;
`;

const ToolbarBox = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
  justify-content: space-between;
  padding: 20px 20px 16px;

  & > .toolbar_title {
    align-items: center;
    display: flex;
    gap: 10px;

    & > h2 {
      color: #121212;
      font-size: 20px;
      font-weight: 700;
    }

    & > .count {
      background: #EEF0F4;
      border-radius: 999px;
      color: #319DFF;
      font-size: 13px;
      font-weight: 700;
      padding: 2px 10px;
    }
  }
`;

const FilterGroupBox = styled.div`
  background: #EEF0F4;
  border-radius: 8px;
  display: inline-flex;
  gap: 4px;
  padding: 4px;

  & > button {
    background: transparent;
    border: none;
    border-radius: 6px;
    color: #666666;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    padding: 7px 14px;
    transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      color: #121212;
    }

    &.active {
      background: #FFFFFF;
      box-shadow: 0 1px 2px rgba(16, 24, 40, 0.1);
      color: #319DFF;
      font-weight: 600;
    }
  }

  @media (max-width: 720px) {
    width: 100%;

    & > button {
      flex: 1;
    }
  }
`;

const TableWrapBox = styled.div<{ $isDimmed?: boolean }>`
  border-block: 1px solid #EEF0F4;
  opacity: ${props => (props.$isDimmed ? 0.55 : 1)};
  overflow-x: auto;
  pointer-events: ${props => (props.$isDimmed ? 'none' : 'auto')};
  transition: opacity 0.2s ease;

  & > table {
    border-collapse: collapse;
    min-width: 880px;
    width: 100%;

    & > thead > tr > th {
      border-bottom: 1px solid #EEF0F4;
      color: #666666;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.06em;
      padding: 12px 16px;
      text-align: left;
      text-transform: uppercase;
      white-space: nowrap;

      &.col_right {
        text-align: right;
      }
    }

    & > tbody > tr {
      transition: background 0.15s ease;

      &:hover {
        background: #F8FAFD;
      }

      & > td {
        border-bottom: 1px solid #F1F3F7;
        color: #121212;
        font-size: 14px;
        padding: 14px 16px;
        vertical-align: middle;
        white-space: nowrap;

        &.col_right {
          text-align: right;
        }

        & > .id {
          color: #666666;
          font-size: 13px;
        }

        & > .placa {
          background: #F8F9FB;
          border: 1px solid #D9DEE5;
          border-radius: 4px;
          font-family: 'Roboto Mono', monospace;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 3px 8px;
          text-transform: uppercase;
        }

        & > .diaria {
          font-weight: 600;
        }

        & > .badge {
          align-items: center;
          border-radius: 999px;
          display: inline-flex;
          font-size: 12px;
          font-weight: 600;
          gap: 6px;
          padding: 4px 10px;

          & > .dot {
            border-radius: 50%;
            height: 6px;
            width: 6px;
          }

          &.sim {
            background: #E6F6EC;
            color: #1E7B45;

            & > .dot {
              background: #2FAE63;
            }
          }

          &.nao {
            background: #FDECEC;
            color: #B3261E;

            & > .dot {
              background: #E1554B;
            }
          }
        }
      }

      &:last-child > td {
        border-bottom: none;
      }
    }
  }

  @media (max-width: 720px) {
    overflow-x: visible;

    & > table {
      min-width: unset;
    }

    & > table > thead {
      display: none;
    }

    & > table > tbody > tr {
      border-bottom: 1px solid #EEF0F4;
      display: block;
      padding: 8px 16px;

      &:hover {
        background: transparent;
      }

      &:last-child {
        border-bottom: none;
      }

      & > td {
        align-items: center;
        border-bottom: none;
        display: flex;
        justify-content: space-between;
        padding: 10px 0;

        &::before {
          color: #666666;
          content: attr(data-label);
          font-size: 13px;
          font-weight: 500;
        }
      }
    }
  }
`;

const ActionButtonBox = styled.div`
  & > button {
    font-size: 14px;
    gap: 6px;
    height: 34px;
    min-width: 0;
    padding: 4px 14px;
  }

  & > button > .btn_icon {
    height: 14px;
    width: 14px;
  }
`;

const PanelFooterBox = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
  justify-content: space-between;
  padding: 16px 20px;

  & > .showing {
    color: #666666;
    font-size: 13px;
  }
`;

const EmptyBox = styled.div`
  align-items: center;
  color: #666666;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 48px 20px;
  text-align: center;

  & > svg {
    color: #A9B5C6;
  }

  & > h3 {
    color: #121212;
    font-size: 18px;
    font-weight: 600;
  }

  & > p {
    font-size: 14px;
  }

  & > button {
    background: transparent;
    border: none;
    color: #319DFF;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    margin-top: 4px;
    text-decoration: underline;

    &:hover {
      color: #005098;
    }
  }
`;

const LoadingWrapBox = styled.div`
  align-items: center;
  border-block: 1px solid #EEF0F4;
  display: flex;
  justify-content: center;
  min-height: 240px;
`;

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [pagination, setPagination] = useState<IPagination | null>(null);
  const [disponivel, setDisponivel] = useState<TDisponivelFilter>('todos');
  const [page, setPage] = useState(1);
  const { user } = useUserContext();
  const per = pagination?.per ?? 10;
  const total = pagination?.total ?? 0;
  const from = (page - 1) * per + 1;
  const to = from + vehicles.length - 1;

  const getAllVehicles = async (params?: IVehicleListPayload) => {
    setIsLoading(true);
    try {
      const response = await VehicleService.findMany(params);
      setVehicles(response?.data ?? []);
      setPagination(response?.pagination ?? null);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast(e.response?.data?.error, { type: 'error' });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const fetchWithFilters = (filter: TDisponivelFilter, page: number) => {
    const per = pagination?.per ?? 10;
    const params: IVehicleListPayload = { page, per };
    if (filter !== 'todos') {
      params.disponivel = filter;
    }
    getAllVehicles(params);
  }

  const handleFilterChange = (value: TDisponivelFilter) => {
    setDisponivel(value);
    fetchWithFilters(value, 1);
  }

  const handlePageChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchWithFilters(disponivel, value);
  }

  const handleLocar = (vehicle: IVehicle) => {
    if (!vehicle.disponivel) {
      return;
    }
    // TODO: integrar com o fluxo de locação (rota /locacoes)
    toast(`${vehicle.marca} ${vehicle.modelo} (${vehicle.placa}) selecionado para locação.`, { type: 'info' });
  }

  const handleNavigateToVehicleForm = () => {
    navigate('/veiculos/cadastrar');
  }

  useEffect(() => {
    (async () => {
      await getAllVehicles();
    })();
  }, [])

  return (
    <HomePageBox>
      <div className='container'>
        <div className='header'>
          <PageHeaderBox>
            <h1>Bem-vindo, {user?.nome}.</h1>
            <p>Aqui estão os veículos disponíveis para locação.</p>
          </PageHeaderBox>

          <Button
            type='button'
            onClick={handleNavigateToVehicleForm}
          >
            Cadastrar veículo
          </Button>
        </div>

        <PanelBox>
          <ToolbarBox>
            <div className='toolbar_title'>
              <h2>Veículos</h2>
              <span className='count'>{pagination ? total : '—'}</span>
            </div>

            <FilterGroupBox role='group' aria-label='Filtrar por disponibilidade'>
              {FILTER_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  className={disponivel === option.value ? 'active' : undefined}
                  aria-pressed={disponivel === option.value}
                  onClick={() => handleFilterChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </FilterGroupBox>
          </ToolbarBox>

          {isLoading && vehicles.length === 0 ? (
            <LoadingWrapBox>
              <Loading />
            </LoadingWrapBox>
          ) : vehicles.length === 0 ? (
            <EmptyBox>
              <MdDirectionsCar size={48} />
              <h3>Nenhum veículo encontrado</h3>
              <p>
                {disponivel === 'todos'
                  ? 'Não há veículos cadastrados.'
                  : 'Nenhum veículo corresponde ao filtro selecionado.'}
              </p>
              {disponivel !== 'todos' && (
                <button onClick={() => handleFilterChange('todos')}>Limpar filtro</button>
              )}
            </EmptyBox>
          ) : (
            <TableWrapBox $isDimmed={isLoading}>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Placa</th>
                    <th>Ano</th>
                    <th className='col_right'>Diária (R$)</th>
                    <th>Disponível</th>
                    <th >Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td data-label='ID'>
                        <span className='id'>#{vehicle.id}</span>
                      </td>
                      <td data-label='Marca'>{vehicle.marca}</td>
                      <td data-label='Modelo'>{vehicle.modelo}</td>
                      <td data-label='Placa'>
                        <span className='placa'>{vehicle.placa}</span>
                      </td>
                      <td data-label='Ano'>{vehicle.ano}</td>
                      <td data-label='Diária (R$)' className='col_right'>
                        <span className='diaria'>{formatDiaria(vehicle.valorDiaria)}</span>
                      </td>
                      <td data-label='Disponível'>
                        <span className={vehicle.disponivel ? 'badge sim' : 'badge nao'}>
                          <span className='dot' />
                          {vehicle.disponivel ? 'Sim' : 'Não'}
                        </span>
                      </td>
                      <td data-label='Ações' className='col_right'>
                        <ActionButtonBox title={vehicle.disponivel ? undefined : 'Veículo indisponível'}>
                          <Button
                            disabled={!vehicle.disponivel}
                            onClick={() => handleLocar(vehicle)}
                            startIcon={vehicle.disponivel ? MdKey : undefined}
                            iconProps={{ size: 16, color: '#FFFFFF' }}
                          >
                            Locar
                          </Button>
                        </ActionButtonBox>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrapBox>
          )}

          <PanelFooterBox>
            <span className='showing'>
              {vehicles.length > 0
                ? `Exibindo ${from}–${to} de ${total} veículos`
                : 'Nenhum veículo para exibir'}
            </span>

            {(pagination?.totalOfPages && pagination?.totalOfPages > 1) && (
              <Pagination
                count={pagination?.totalOfPages}
                size='small'
                page={page}
                shape='rounded'
                onChange={handlePageChange}
              />
            )}
          </PanelFooterBox>
        </PanelBox>
      </div>
    </HomePageBox>
  );
};

export default HomePage;
