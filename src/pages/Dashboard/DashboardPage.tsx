import { Layout } from 'antd';
import { SideMenu } from '../../components/SideMenu';
import { useAppSelector } from '../../hooks/rtkHooks';

const DashboardPage = () => {
  const board = useAppSelector((state) => state.board.list);

  return (
    <Layout.Content>
      <SideMenu board={board} />
    </Layout.Content>
  );
};

export { DashboardPage };
