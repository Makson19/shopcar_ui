import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import Input from '../components/Input';
import Button from '../components/Button';
import Loading from '../components/Loading';
import VehicleService from '../services/VehicleService';

const VehicleFormBox = styled.div`
  & > .container {
    margin-inline: auto;
    max-width: 1000px;
    padding: 24px 16px 40px;

    & > .form_container {
      background: #FFFFFF;
      border-radius: 8px;
      margin-inline: auto;
      max-width: 500px;
      padding: 20px;
      width: 100%;

      & > .logo {
        display: flex;
        justify-content: center;
      }

      & > .form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 32px;

        & > .actions {
          align-items: center;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 8px;
        }
      }
    }
  }
`;

const formSchema = z.object({
  marca: z.string('Campo obrigatório').min(1, 'Campo obrigatório'),
  modelo: z.string('Campo obrigatório').min(1, 'Campo obrigatório'),
  placa: z.string('Campo obrigatório').min(1, 'Campo obrigatório').transform((value) => value.toUpperCase()),
  ano: z.number('Campo obrigatório').positive('Informe um valor maior que zero'),
  valorDiaria: z.number('Campo obrigatório').positive('Informe um valor maior que zero')
});

type FormData = z.infer<typeof formSchema>;

const VehicleFormPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const handleBackPage = () => {
    navigate('/', { replace: true });
  }

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    setIsLoading(true);
    try {
      await VehicleService.create(values);
      toast('Veículo criado com sucesso.', { type: 'success', pauseOnFocusLoss: false });
      reset();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast(e.response?.data?.error, { type: 'error' });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VehicleFormBox>
      <div className='container'>
        <div className='form_container'>
          <div className='logo'>
            <h3>Cadastrar veículo</h3>
          </div>

          <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='form_field'>
              <Controller
                name='marca'
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      label='Marca'
                      inputProps={{
                        id: 'marca',
                        type: 'text',
                        placeholder: 'Marca...',
                        autoComplete: 'off',
                        disabled: isLoading,
                        ...field,
                        value: field.value ?? ''
                      }}
                      error={errors?.marca?.message}
                    />
                  )
                }}
              />
            </div>

            <div className='form_field'>
              <Controller
                name='modelo'
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      label='Modelo'
                      inputProps={{
                        id: 'modelo',
                        type: 'text',
                        placeholder: 'Modelo...',
                        autoComplete: 'off',
                        disabled: isLoading,
                        ...field,
                        value: field.value ?? ''
                      }}
                      error={errors?.modelo?.message}
                    />
                  )
                }}
              />
            </div>

            <div className='form_field'>
              <Controller
                name='placa'
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      label='Placa'
                      inputProps={{
                        id: 'placa',
                        type: 'text',
                        placeholder: 'Placa...',
                        autoComplete: 'off',
                        disabled: isLoading,
                        ...field,
                        value: field.value ?? ''
                      }}
                      error={errors?.placa?.message}
                    />
                  )
                }}
              />
            </div>

            <div className='form_field'>
              <Controller
                name='ano'
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      label='Ano do veículo'
                      inputProps={{
                        id: 'ano',
                        type: 'number',
                        placeholder: 'Ano do veículo...',
                        autoComplete: 'off',
                        disabled: isLoading,
                        ...field,
                        value: field.value ?? '',
                        onChange: (event) => {
                          const value = event.target.value;
                          field.onChange(value === '' ? undefined : Number(value));
                        }
                      }}
                      error={errors?.ano?.message}
                    />
                  )
                }}
              />
            </div>

            <div className='form_field'>
              <Controller
                name='valorDiaria'
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      label='Valor da diária'
                      inputProps={{
                        id: 'diaria',
                        type: 'number',
                        placeholder: 'Valor da diária...',
                        autoComplete: 'off',
                        disabled: isLoading,
                        ...field,
                        value: field.value ?? '',
                        onChange: (event) => {
                          const value = event.target.value;
                          field.onChange(value === '' ? undefined : Number(value));
                        }
                      }}
                      error={errors?.valorDiaria?.message}
                    />
                  )
                }}
              />
            </div>

            <div className='actions'>
              <Button
                type='submit'
                fullWidth
                disabled={isLoading}
                startIcon={isLoading ? Loading : undefined}
                iconProps={{
                  size: 16,
                  color: '#FFFFFF'
                }}
              >
                Salvar
              </Button>

              <Button
                type='button'
                variant='outlined'
                fullWidth
                disabled={isLoading}
                onClick={handleBackPage}
              >
                Voltar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </VehicleFormBox>
  );
};

export default VehicleFormPage;
