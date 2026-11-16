import styled from 'styled-components';
import { Link, useNavigate } from 'react-router';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import Avatar from './Avatar';
import Logo from './Logo';
import { useUserContext } from '../contexts/UserContext';
import { MdLogout } from 'react-icons/md';

const HeaderBox = styled.header`
  background: #ffffff;
  padding: 16px 32px;

  & > .navbar {
    align-items: center;
    display: flex;
    justify-content: space-between;

    & > .navbar_link {
      text-decoration: none;
    }

    & > .actions {
      align-items: center;
      display: flex;
      gap: 40px;

      & > .actions_link {
        color: #319DFF;
        font-size: 18px;
        font-weight: 500;
        text-decoration: none;
        transition: color 0.3s ease-in-out;

        &:hover {
          color: #005098;
          text-decoration: underline;
        }
      }

      & > .szh-menu-button {
        background: transparent;
        border: none;
        cursor: pointer;
        outline: none;
      }
    }
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const getInitials = () => {
    const initials = user?.nome?.split(' ');
    if (initials && initials?.length > 1) {
      return `${initials?.[0][0]}${initials?.[initials?.length - 1][0]}`;
    } else {
      return `${initials?.[0][0]}`;
    }
  }

  const logout = () => {
    navigate('/logout');
  }

  return (
    <HeaderBox>
      <nav className='navbar'>
        <Link to='/' className='navbar_link'>
          <Logo />
        </Link>

        <div className='actions'>
          <Link to='/locacoes' className='actions_link'>
            Locações
          </Link>

          <Menu
            align='end'
            menuButton={
              <MenuButton>
                <Avatar
                  initials={getInitials()}
                  bgColor='#A9B5C6'
                  textColor='#121212'
                />
              </MenuButton>
            }
          >
            <MenuItem onClick={logout}>
              <MdLogout style={{ marginRight: '8px' }} />
              Sair
            </MenuItem>
          </Menu>
        </div>
      </nav>
    </HeaderBox>
  );
};

export default Header;
