import styled from 'styled-components';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router';
import Button from '../components/Button';
import Input from '../components/Input';
import Logo from '../components/Logo';

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

      & > .btn_submit {
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
  email: z.string('Campo obrigatório').email('E-mail inválido'),
  password: z.string('Campo obrigatório')
});

type FormData = z.infer<typeof formSchema>;

const LoginPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  console.log('errors', errors)

  const onSubmit: SubmitHandler<FormData> = (values) => {
    console.log('values', values);
    reset();
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
              name='password'
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
                    error={errors?.password?.message}
                  />
                )
              }}
            />
          </div>

          <div className='btn_submit'>
            <Button type='submit' fullWidth>
              Acessar
            </Button>
          </div>
        </form>

        <Link to='/cadastrar' className='link' replace>
          Não tem um conta?
        </Link>
      </div>
    </Box>
  );
};

export default LoginPage;
