import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaWarehouse, FaBox, FaShoppingCart, FaBell, FaSearch, FaCheck, FaFileContract, FaThList } from 'react-icons/fa';
import styled from 'styled-components';

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <LogoContainer>
        <img src="/images/logoT.jpg" alt="Logo" />
      </LogoContainer>

      <SidebarList>
        {menuItems.map((item, idx) => (
          <SidebarItem key={idx}>
            <StyledLink to={item.link} title={item.label}>
              {item.icon}
              <Tooltip>{item.label}</Tooltip>
            </StyledLink>
          </SidebarItem>
        ))}
      </SidebarList>
    </SidebarContainer>
  );
};

const menuItems = [
  { label: 'Home', icon: <FaHome size={30} />, link: '/' },
  { label: 'Almacén', icon: <FaWarehouse size={30} />, link: '/almacen' },
  { label: 'Producto', icon: <FaBox size={30} />, link: '/producto' },
  { label: 'Comercial', icon: <FaShoppingCart size={30} />, link: '/comercial' },
  { label: 'Noti-Tarahumara', icon: <FaBell size={30} />, link: '/Notitarahumara' },
  { label: 'Kardex', icon: <FaFileContract size={30} />, link: '/Kardex' },
  { label: 'Cursos', icon: <FaCheck size={30} />, link: '/Cursos' },
  { label: 'Asignar Curso', icon: <FaThList size={30} />, link: '/Assign' },
  { label: 'Buscar', icon: <FaSearch size={30} />, link: '/search' },
];

const SidebarContainer = styled.div`
  width: 60px;
  height: 100vh;
  background-color: #f4f4f4;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  padding-top: 15px;
`;

const LogoContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background-color: #ffffff;

  img {
    width: 100%;
    height: auto;
  }
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SidebarItem = styled.li`
  margin: 10px 0;
  width: 100%;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 0;
  color: #9A3324;
  text-decoration: none;
  position: relative;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: rgba(154, 51, 36, 0.1);
    transform: scale(1.05);
    border-radius: 12px;
  }

  &:hover span {
    visibility: visible;
    opacity: 1;
  }

  svg {
    transition: color 0.3s ease;
  }

  &:hover svg {
    color: #9A3324;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  left: 100%;
  margin-left: 10px;
  padding: 6px 12px;
  background-color: #9A3324;
  color: #ffffff;
  border-radius: 8px;
  font-size: 12px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export default Sidebar;
