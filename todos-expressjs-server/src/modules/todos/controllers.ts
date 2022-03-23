import {
  IControllerResult,
  newControllerData,
  newControllerError,
} from '../../utils/controller-result.model';
import { todosDal, TodosDal } from './dal';
import { ITodoPayload, IOrderPayload, Todo } from './model';
import {
  validateTodoCreatePayload,
  validateTodoEditPayload,
  validateTodoEditOrderPayload,
} from './validator';

export class TodosController {
  todosDal: TodosDal;
  constructor(todosDal: TodosDal) {
    this.todosDal = todosDal;
  }

  create(payload: ITodoPayload): IControllerResult<Todo> {
    const { error, value } = validateTodoCreatePayload(payload);
    if (error) {
      return newControllerError(error.details[0].message, 400);
    }

    return newControllerData(this.todosDal.create(value));
  }

  //TODO: Implement get all
  getAll(): IControllerResult<Todo[]> {
    return {
      error: null,
      data: todosDal.getAll(),
    };
  }

  //TODO: Implement update
  update(payload: ITodoPayload, id: string): IControllerResult<Todo> {
    const { error, value } = validateTodoEditPayload(payload);
    if (error) {
      return newControllerError(error.details[0].message, 400);
    }
    return newControllerData(this.todosDal.edit(value, id));
  }

  //TODO: Implement update order
  updateOrder(payload: IOrderPayload): IControllerResult<string> {
    const { error, value } = validateTodoEditOrderPayload(payload);
    if (error) {
      return newControllerError(error.details[0].message, 400);
    }
    this.todosDal.editOrder(value.source, value.destination);
    return newControllerData('Data ordered updated!');
  }

  //TODO: Implement delete
  delete(id: string): IControllerResult<String> {
    todosDal.delete(id);
    return newControllerData(`Todo with ID ${id} is deleted!`);
  }
}

export const todosController = new TodosController(todosDal);
