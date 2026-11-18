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
import Table, { type IColumn } from '../components/Table';
import Badge from '../components/Badge';
import { formatDiaria } from '../utils/functions';


const HomePageBox = styled.div`
  & > .container {
    margin-inline: auto;
    max-width: 1200px;
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

const IdBox = styled.span`
  color: #666666;
  font-size: 13px;
`;

const Placa = styled.span`
  background: #F8F9FB;
  border: 1px solid #D9DEE5;
  border-radius: 4px;
  font-family: 'Roboto Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 3px 8px;
  text-transform: uppercase;
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
  const [page, setPage] = useState(1);
  const { user } = useUserContext();
  const per = pagination?.per ?? 10;
  const total = pagination?.total ?? 0;
  const from = (page - 1) * per + 1;
  const to = from + vehicles.length - 1;

  const getAllVehicles = async (params?: IVehicleListPayload) => {
    setIsLoading(true);
    try {
      const response = await VehicleService.findMany({ disponivel: 'true', ...params });
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

  const fetchWithFilters = (page: number) => {
    const per = pagination?.per ?? 10;
    const params: IVehicleListPayload = { page, per };
    getAllVehicles(params);
  }

  const handlePageChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchWithFilters(value);
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

  const columns: IColumn<IVehicle>[] = [
    {
      key: 'id',
      name: 'ID',
      align: 'left',
      render: (row) => {
        return (
          <IdBox>
            #{row?.id}
          </IdBox>
        )
      }
    },
    {
      key: 'brand',
      name: 'Marca',
      align: 'left',
      render: (row) => {
        return row?.marca
      }
    },
    {
      key: 'model',
      name: 'Modelo',
      align: 'left',
      render: (row) => {
        return row?.modelo
      }
    },
    {
      key: 'sign',
      name: 'Placa',
      align: 'left',
      render: (row) => {
        return (
          <Placa>
            {row?.placa}
          </Placa>
        )
      }
    },
    {
      key: 'year',
      name: 'Ano',
      align: 'left',
      render: (row) => {
        return row?.ano
      }
    },
    {
      key: 'daily_rate',
      name: 'Diária (R$)',
      align: 'right',
      render: (row) => {
        return (
          <span style={{ fontWeight: 600, textAlign: 'right', display: 'block' }}>
            {formatDiaria(row?.valorDiaria)}
          </span>
        )
      }
    },
    {
      key: 'available',
      name: 'Disponível',
      align: 'left',
      render: (row) => {
        return (
          <Badge
            label={row?.disponivel ? 'Sim' : 'Não'}
            type={row?.disponivel ? 'success' : 'error'}
          />
        )
      }
    },
    {
      key: 'actions',
      name: 'Ações',
      align: 'left',
      render: (row) => {
        return (
          <ActionButtonBox title={row.disponivel ? undefined : 'Veículo indisponível'}>
            <Button
              disabled={!row.disponivel}
              onClick={() => handleLocar(row)}
              startIcon={row.disponivel ? MdKey : undefined}
              iconProps={{ size: 16, color: '#FFFFFF' }}
            >
              Locar
            </Button>
          </ActionButtonBox>
        )
      }
    }
  ];

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
          </ToolbarBox>

          {isLoading && vehicles.length === 0 ? (
            <LoadingWrapBox>
              <Loading />
            </LoadingWrapBox>
          ) : vehicles.length === 0 ? (
            <EmptyBox>
              <MdDirectionsCar size={48} />
              <h3>Nenhum veículo encontrado</h3>
              <p>Não há veículos cadastrados.</p>
            </EmptyBox>
          ) : (
            <Table
              columns={columns}
              data={vehicles}
              disableEvents={isLoading}
            />
          )}

          <PanelFooterBox>
            <span className='showing'>
              {vehicles.length > 0
                ? `Exibindo ${from}–${to} de ${total} veículos`
                : 'Nenhum veículo para exibir'}
            </span>

            {(pagination?.totalOfPages ?? 0) > 1 && (
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
