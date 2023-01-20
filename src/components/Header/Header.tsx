import { Menu, MenuProps } from 'antd';
import { Layout } from 'antd';
import logo from '../../assets/logo/logo_no_bg.png';
import styles from './Header.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const items = [
  {
    label: 'sign In',
    key: '/login',
  },
  {
    label: 'sign Up',
    key: '/signup',
  },
];

const signout = [
  {
    label: 'Sign Out',
    key: '/login',
  },
];

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  const { Header } = Layout;

  const onClickMenuItem: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  const onClickLogo = () => {
    navigate('/');
  };

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  return (
    <div className="wrapper">
      <Header className={styles.header}>
        <div style={{ cursor: 'pointer' }} onClick={onClickLogo}>
          <img src={logo} alt="logo" style={{ height: '100%' }} />
        </div>
        <Menu
          disabledOverflow={true}
          items={items}
          selectedKeys={[current]}
          theme="dark"
          mode="horizontal"
          style={{ fontSize: 20 }}
          onClick={onClickMenuItem}
        />
      </Header>
    </div>
  );
};
