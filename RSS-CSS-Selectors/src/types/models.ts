export type Task = {
  id: number;
  title: string;
  htmlCode: string;
  syntheticCode: string;
  correct: Array<string>;
  description: string;
};

export type Tasks = Array<Task>;
