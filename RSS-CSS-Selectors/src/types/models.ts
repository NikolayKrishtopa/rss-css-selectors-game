export type Task = {
  id: number;
  title: string;
  htmlCode: string;
  syntheticCode: string;
  correct: Array<string>;
};

export type Tasks = Array<Task>;
