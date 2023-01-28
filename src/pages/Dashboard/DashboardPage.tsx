import { useAppSelector } from '../../hooks/rtkHooks';

const DashboardPage = () => {
  const board = useAppSelector((state) => state.board.list);

  return (
    <div>
      {board.map((board) => (
        <span key={board.id}>{board.title}</span>
      ))}
    </div>
  );
};

export { DashboardPage };
