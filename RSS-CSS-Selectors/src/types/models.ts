export type Task = {
  id: number;
  title: string;
  htmlCode: string;
  syntheticCode: string;
  correct: string;
};

export type Tasks = Array<Task>;
