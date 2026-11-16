import styled from 'styled-components';
import { Outlet } from 'react-router';
import Header from './Header';

const TemplateBox = styled.div`
  & > .content {
    background: #EEF0F4;
    min-height: calc(100vh - 79px);
  }
`;

const Template = () => {
  return (
    <TemplateBox>
      <Header />
      <main className='content'>
        <Outlet />
      </main>
    </TemplateBox>
  );
};

export default Template;
