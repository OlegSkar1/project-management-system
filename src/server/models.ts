export interface IUser {
  id?: number;
  email: string;
  password: string;
  name: string;
}

export interface IAuthUser extends IUser {
  boards: IBoards[];
}

export interface IBoards {
  id?: number;
  title: string;
  userId: number;
  users: string[];
}

export interface Column {
  id?: number;
  title: string;
  order: number;
  boardId: number;
}

export interface IFile {
  name: string;
  boardId: string;
  taskId: string;
  path: string;
}

export interface IPoint {
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
}

export interface ITask {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  users: string[];
}
