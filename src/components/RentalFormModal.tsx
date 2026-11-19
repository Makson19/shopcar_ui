import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdCheck } from 'react-icons/md';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Input from './Input';
import Button from './Button';
import Loading from './Loading';
import RentalService from '../services/RentalService';
import type { IVehicle } from '../types/IVehicle';
import { formatDiaria } from '../utils/functions';

const RentalFormBox = styled.form`
  & .vehicle {
    background: #F8F9FB;
    border: 1px solid #E8ECF2;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 20px;
    padding: 12px 16px;

    & > strong {
      color: #121212;
      font-size: 16px;
      font-weight: 700;
    }

    & > span {
      color: #666666;
      font-size: 14px;
    }
  }

  & .fields {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDefaultValues = (): FormData => ({
  dataInicio: getToday(),
  dataPrevistaDevolucao: '',
});

const formSchema = z
  .object({
    dataInicio: z.string().min(1, 'Campo obrigatório'),
    dataPrevistaDevolucao: z.string().min(1, 'Campo obrigatório'),
  })
  .refine((values) => values.dataPrevistaDevolucao >= values.dataInicio, {
    message: 'A data prevista deve ser igual ou posterior à data de início',
    path: ['dataPrevistaDevolucao'],
  });

type FormData = z.infer<typeof formSchema>;

interface IRentalFormModalProps {
  open: boolean;
  vehicle: IVehicle | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const RentalFormModal = (props: IRentalFormModalProps) => {
  const { open, vehicle, onClose, onSuccess } = props;
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    if (open) {
      reset(getDefaultValues());
    }
  }, [open, reset]);

  const handleClose = () => {
    if (isLoading) {
      return;
    }
    onClose();
  }

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    if (!vehicle) {
      return;
    }

    setIsLoading(true);
    try {
      await RentalService.rent({
        veiculoId: vehicle.id,
        dataInicio: values.dataInicio,
        dataPrevistaDevolucao: values.dataPrevistaDevolucao,
      });
      toast(
        `Locação do veículo ${vehicle.marca} ${vehicle.modelo} (${vehicle.placa}) realizada com sucesso.`,
        { type: 'success', pauseOnFocusLoss: false }
      );
      reset(getDefaultValues());
      onSuccess?.();
      onClose();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast(e.response?.data?.error, { type: 'error' });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='xs'
    >
      <DialogTitle>Locar veículo</DialogTitle>

      <RentalFormBox onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {vehicle && (
            <div className='vehicle'>
              <strong>{vehicle.marca} {vehicle.modelo}</strong>{' '}
              <span>
                Placa {vehicle.placa} • Diária {formatDiaria(vehicle.valorDiaria)}
              </span>
            </div>
          )}

          <div className='fields'>
            <div className='field'>
              <Controller
                name='dataInicio'
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      label='Data de início'
                      inputProps={{
                        id: 'dataInicio',
                        type: 'date',
                        disabled: isLoading,
                        ...field,
                        value: field.value ?? '',
                      }}
                      error={errors?.dataInicio?.message}
                    />
                  )
                }}
              />
            </div>

            <div className='field'>
              <Controller
                name='dataPrevistaDevolucao'
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      label='Data prevista de devolução'
                      inputProps={{
                        id: 'dataPrevistaDevolucao',
                        type: 'date',
                        disabled: isLoading,
                        min: getToday(),
                        ...field,
                        value: field.value ?? '',
                      }}
                      error={errors?.dataPrevistaDevolucao?.message}
                    />
                  )
                }}
              />
            </div>
          </div>
        </DialogContent>

        <DialogActions sx={{ padding: '16px' }}>
          <Button
            type='button'
            variant='outlined'
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>

          <Button
            type='submit'
            disabled={isLoading || !vehicle}
            startIcon={isLoading ? Loading : MdCheck}
            iconProps={{
              size: 16,
              color: '#FFFFFF'
            }}
          >
            {isLoading ? 'Locando...' : 'Finalizar locação'}
          </Button>
        </DialogActions>
      </RentalFormBox>
    </Dialog>
  );
};

export default RentalFormModal;
