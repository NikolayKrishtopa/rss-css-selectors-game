export type Task = {
  id: number;
  title: string;
  htmlCode: string;
  syntheticCode: string;
  correct: Array<string>;
  description: string;
};

export type Tasks = Array<Task>;

export interface IGame {
  tasks: Tasks;
}

export type OpenAlert = () => void;

export interface IPopup {
  reset: OpenAlert;
}
