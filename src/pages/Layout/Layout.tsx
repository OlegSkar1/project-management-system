import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import layout from './Layout.module.scss';

export const LayoutPage: React.FC = () => {
  return (
    <Layout className={layout.layout}>
      <div className={layout.main}>
        <Header />
        <Layout>
          <Outlet />
        </Layout>
      </div>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
};
