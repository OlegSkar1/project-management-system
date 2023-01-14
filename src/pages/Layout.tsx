import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const LayoutPage: React.FC = () => {
  return (
    <Layout style={{ flex: 1, height: '100vh' }}>
      <Header />
      <Layout>
        <Outlet />
      </Layout>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>{' '}
    </Layout>
  );
};

export default LayoutPage;
