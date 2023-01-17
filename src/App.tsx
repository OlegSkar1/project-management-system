import { ConfigProvider } from 'antd';
import { AppRouter } from './router';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#001f4c',
        },
      }}
    >
      <AppRouter />
    </ConfigProvider>
  );
};

export default App;
