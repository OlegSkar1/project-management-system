import { IBoards } from '../../server/models';

interface SideMenuProps {
  board: IBoards[];
}

export const SideMenu: React.FC<SideMenuProps> = ({ board }) => {
  return <div>SideMenu</div>;
};
