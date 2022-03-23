import { todosArray } from '../../config/db';
import { ITodoPayload, Todo } from './model';
import { uuid } from 'uuidv4';
import _ from 'lodash';

export class TodosDal {
  todosArray: Todo[];

  constructor(todosArray: Todo[]) {
    this.todosArray = todosArray;
  }

  create(payload: ITodoPayload): Todo {
    const newTodo: Todo = {
      _id: uuid(),
      ...payload,
    };
    this.todosArray.push(newTodo);

    return newTodo;
  }

  edit(payload: ITodoPayload, id: string): Todo {
    const editedTodo: Todo = {
      _id: id,
      ...payload,
    };
    const todoIndex = _.findIndex(this.todosArray, { _id: id });

    if (todoIndex != -1) this.todosArray[todoIndex] = editedTodo;

    return editedTodo;
  }

  editOrder(source: number, destination: number) {
    const items = Array.from(this.todosArray);
    const [reorderedItem] = items.splice(source, 1);
    items.splice(destination, 0, reorderedItem);

    this.todosArray = items;
  }

  getAll(): Todo[] {
    return this.todosArray;
  }

  getOne(id: string): Todo {
    return _.find(this.todosArray, { _id: id });
  }

  delete(id: string) {
    _.remove(this.todosArray, { _id: id });
  }
}

export const todosDal = new TodosDal(todosArray);
