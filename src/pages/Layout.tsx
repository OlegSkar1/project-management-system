import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const LayoutPage: React.FC = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <div style={{ flex: 1 }}>
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

export default LayoutPage;
