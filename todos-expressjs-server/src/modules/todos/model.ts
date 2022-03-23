export interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

export interface ITodoPayload {
  text: string;
  completed: boolean;
}

export interface IOrderPayload {
  source: number;
  destination: number;
}
