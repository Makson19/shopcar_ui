import React from 'react'
import { isAuthenticated } from '../utils/functions';
import { useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const HomePageBox = styled.div`
  
`;

const HomePage = () => {
  console.log('isAuthenticated', isAuthenticated())
  const { user } = useUserContext();
  const navigate = useNavigate();

  const logout = () => navigate('/logout');

  return (
    <HomePageBox>
      <h1>Olá, {user?.nome}</h1>
      <button type='button' onClick={logout}>
        Sair
      </button>
    </HomePageBox>
  );
};

export default HomePage;
