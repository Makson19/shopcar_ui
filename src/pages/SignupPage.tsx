import React from 'react';
import styled from 'styled-components';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router';

const Box = styled.div`
  align-items: center;
  background: #EEF0F4;
  display: flex;
  height: 100vh;
  justify-content: center;

  & > .container {
    background: #FFFFFF;
    border-radius: 8px;
    max-width: 400px;
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
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 8px;
      }
    }

    & > .link {
      color: #319DFF;
      display: inline-flex;
      margin-top: 16px;
      transition: color 0.3s ease-in-out;

      &:hover {
        color: #0077E4;
      }
    }
  }
`;

const formSchema = z.object({
  nome: z.string('Campo obrigatório'),
  email: z.string('Campo obrigatório').email('E-mail inválido'),
  senha: z.string('Campo obrigatório').min(6, 'A senha deve ter no mínimo 6 caracteres')
});

type FormData = z.infer<typeof formSchema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (values) => {
    console.log('values', values);
    reset();
  }

  const handleBackPage = () => {
    navigate('/login');
  }

  return (
    <Box>
      <div className='container'>
        <div className='logo'>
          <Logo />
        </div>

        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <div className='form_field'>
            <Controller
              name='nome'
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    label='Nome'  
                    inputProps={{
                      id: 'name',
                      type: 'text',
                      placeholder: 'Nome...',
                      autoComplete: 'off',
                      ...field
                    }}
                    error={errors?.nome?.message}
                  />
                )
              }}
            />
          </div>
          <div className='form_field'>
            <Controller
              name='email'
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    label='E-mail'
                    inputProps={{
                      id: 'email',
                      type: 'email',
                      placeholder: 'E-mail...',
                      autoComplete: 'off',
                      ...field
                    }}
                    error={errors?.email?.message}
                  />
                )
              }}
            />
          </div>

          <div className='form_field'>
            <Controller
              name='senha'
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    label='Senha'
                    inputProps={{
                      id: 'password',
                      type: 'password',
                      placeholder: 'Senha...',
                      min: 6,
                      ...field
                    }}
                    error={errors?.senha?.message}
                  />
                )
              }}
            />
          </div>

          <div className='actions'>
            <Button type='submit'>
              Cadastrar
            </Button>

            <Button type='button' variant='outlined' onClick={handleBackPage}>
              Voltar
            </Button>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default SignupPage;
