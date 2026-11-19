import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { MdArrowBack, MdCheckCircle, MdReceiptLong } from 'react-icons/md';
import Table, { type IColumn } from '../components/Table';
import Badge from '../components/Badge';
import Pagination from '../components/Pagination';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import RentalService from '../services/RentalService';
import type { IRental, IRentalListPayload } from '../types/IRental';
import type { IPagination } from '../types/IPagination';
import { RENTAL_FILTER_OPTIONS, type TStatusFilter } from '../utils/constants';
import { formatDate, formatDiaria } from '../utils/functions';

const RentalPageBox = styled.div`
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

const BackButtonBox = styled.div`
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

const getStatusBadge = (status: string) => {
  const normalizado = status?.toLowerCase() ?? '';

  if (normalizado.includes('final') || normalizado.includes('conclu') || normalizado.includes('devolv')) {
    return { label: status, type: 'default' as const };
  }

  if (normalizado.includes('cancel')) {
    return { label: status, type: 'error' as const };
  }

  return { label: status, type: 'success' as const };
};

const isAtiva = (status: string) => {
  return status?.toUpperCase().startsWith('ATIV');
};

const RentalPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [rentals, setRentals] = useState<IRental[]>([]);
  const [pagination, setPagination] = useState<IPagination | null>(null);
  const [status, setStatus] = useState<TStatusFilter>('todos');
  const [page, setPage] = useState(1);
  const [isFinishing, setIsFinishing] = useState<number | null>(null);
  const [rentalToFinish, setRentalToFinish] = useState<IRental | null>(null);
  const per = pagination?.per ?? 10;
  const total = pagination?.total ?? 0;
  const from = (page - 1) * per + 1;
  const to = from + rentals.length - 1;

  const getAllRentals = async (params?: IRentalListPayload) => {
    setIsLoading(true);
    try {
      const response = await RentalService.findMany(params);
      setRentals(response?.data ?? []);
      setPagination(response?.pagination ?? null);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast(e.response?.data?.error, { type: 'error' });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const fetchWithFilters = (filter: TStatusFilter, page: number) => {
    const per = pagination?.per ?? 10;
    const params: IRentalListPayload = { page, per };
    if (filter !== 'todos') {
      params.status = filter;
    }
    getAllRentals(params);
  }

  const handleFilterChange = (value: TStatusFilter) => {
    setStatus(value);
    fetchWithFilters(value, 1);
  }

  const handlePageChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchWithFilters(status, value);
  }

  const handleOpenFinishDialog = (rental: IRental) => {
    if (!isAtiva(rental?.status) || isFinishing) {
      return;
    }

    setRentalToFinish(rental);
  }

  const handleCloseFinishDialog = () => {
    if (isFinishing) {
      return;
    }
    setRentalToFinish(null);
  }

  const handleConfirmFinish = async () => {
    const rental = rentalToFinish;
    if (!rental || isFinishing) {
      return;
    }

    setIsFinishing(rental.id);
    try {
      const response = await RentalService.finish(rental.id);
      const veiculo = response?.veiculo;
      toast(
        veiculo
          ? `Locação #${rental.id} finalizada. Veículo ${veiculo.marca} ${veiculo.modelo} disponível novamente.`
          : `Locação #${rental.id} finalizada com sucesso.`,
        { type: 'success' }
      );
      setRentalToFinish(null);
      fetchWithFilters(status, page);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast(e.response?.data?.error, { type: 'error' });
      }
    } finally {
      setIsFinishing(null);
    }
  }

  const handleNavigateToVehicles = () => {
    navigate('/')
  }

  const columns: IColumn<IRental>[] = [
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
      key: 'vehicle',
      name: 'Veículo',
      align: 'left',
      render: (row) => {
        return `${row?.veiculo?.marca ?? ''} ${row?.veiculo?.modelo ?? ''}`.trim() || '—'
      }
    },
    {
      key: 'sign',
      name: 'Placa',
      align: 'left',
      render: (row) => {
        return (
          <Placa>
            {row?.veiculo?.placa ?? '—'}
          </Placa>
        )
      }
    },
    {
      key: 'start_date',
      name: 'Data início',
      align: 'left',
      render: (row) => {
        return formatDate(row?.dataInicio)
      }
    },
    {
      key: 'expected_date',
      name: 'Data Prevista',
      align: 'left',
      render: (row) => {
        return formatDate(row?.dataPrevistaDevolucao)
      }
    },
    {
      key: 'daily_rate',
      name: 'Diária (R$)',
      align: 'right',
      render: (row) => {
        return (
          <span style={{ fontWeight: 600, textAlign: 'right', display: 'block' }}>
            {formatDiaria(row?.veiculo?.valorDiaria)}
          </span>
        )
      }
    },
    {
      key: 'total',
      name: 'Total (R$)',
      align: 'right',
      render: (row) => {
        return (
          <span style={{ fontWeight: 600, textAlign: 'right', display: 'block' }}>
            {formatDiaria(row?.valorTotal)}
          </span>
        )
      }
    },
    {
      key: 'status',
      name: 'Status',
      align: 'left',
      render: (row) => {
        const { label, type } = getStatusBadge(row?.status);
        return (
          <Badge
            label={label}
            type={type}
          />
        )
      }
    },
    {
      key: 'actions',
      name: 'Ações',
      align: 'left',
      render: (row) => {
        const ativa = isAtiva(row?.status);
        return (
          <ActionButtonBox title={ativa ? undefined : 'Locação não está mais ativa'}>
            <Button
              disabled={!ativa || isFinishing === row.id}
              onClick={() => handleOpenFinishDialog(row)}
              startIcon={MdCheckCircle}
              iconProps={{ size: 16, color: '#FFFFFF' }}
            >
              Finalizar
            </Button>
          </ActionButtonBox>
        )
      }
    }
  ];

  useEffect(() => {
    (async () => {
      await getAllRentals();
    })();
  }, [])

  return (
    <RentalPageBox>
      <div className='container'>
        <div className='header'>
          <PageHeaderBox>
            <h1>Suas locações</h1>
            <p>Acompanhe o histórico e o andamento das suas locações.</p>
          </PageHeaderBox>

          <BackButtonBox>
            <Button
              type='button'
              variant='outlined'
              onClick={handleNavigateToVehicles}
              startIcon={MdArrowBack}
              iconProps={{ size: 16, color: '#319DFF' }}
            >
              Ver veículos
            </Button>
          </BackButtonBox>
        </div>

        <PanelBox>
          <ToolbarBox>
            <div className='toolbar_title'>
              <h2>Locações</h2>
              <span className='count'>{pagination ? total : '—'}</span>
            </div>

            <FilterGroupBox role='group' aria-label='Filtrar por disponibilidade'>
              {RENTAL_FILTER_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  className={status === option.value ? 'active' : undefined}
                  aria-pressed={status === option.value}
                  onClick={() => handleFilterChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </FilterGroupBox>
          </ToolbarBox>

          {isLoading && rentals.length === 0 ? (
            <LoadingWrapBox>
              <Loading />
            </LoadingWrapBox>
          ) : rentals.length === 0 ? (
            <EmptyBox>
              <MdReceiptLong size={48} />
              <h3>Nenhuma locação encontrada</h3>
              <p>
                {status === 'todos'
                  ? 'Você ainda não realizou locações.'
                  : 'Nenhuma locação corresponde ao filtro selecionado.'}
              </p>
              {status !== 'todos' && (
                <button onClick={() => handleFilterChange('todos')}>Limpar filtro</button>
              )}
            </EmptyBox>
          ) : (
            <Table
              columns={columns}
              data={rentals}
              disableEvents={isLoading}
            />
          )}

          <PanelFooterBox>
            <span className='showing'>
              {rentals.length > 0
                ? `Exibindo ${from}–${to} de ${total} locações`
                : 'Nenhuma locação para exibir'}
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

      <Dialog
        open={Boolean(rentalToFinish)}
        onClose={handleCloseFinishDialog}
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle>Finalizar locação</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Deseja finalizar a locação{' '}
            <strong>#{rentalToFinish?.id}</strong> do veículo{' '}
            <strong>
              {rentalToFinish?.veiculo?.marca} {rentalToFinish?.veiculo?.modelo}
            </strong>{' '}
            ({rentalToFinish?.veiculo?.placa})? O veículo ficará disponível
            novamente para locação.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ padding: '16px' }}>
          <Button
            type='button'
            variant='outlined'
            onClick={handleCloseFinishDialog}
            disabled={Boolean(isFinishing)}
          >
            Cancelar
          </Button>

          <Button
            type='button'
            onClick={handleConfirmFinish}
            disabled={Boolean(isFinishing)}
            startIcon={isFinishing ? Loading : MdCheckCircle}
            iconProps={{ size: 16, color: '#FFFFFF' }}
          >
            {isFinishing ? 'Finalizando...' : 'Finalizar'}
          </Button>
        </DialogActions>
      </Dialog>
    </RentalPageBox>
  );
};

export default RentalPage;
