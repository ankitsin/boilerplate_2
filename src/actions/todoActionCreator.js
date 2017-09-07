
import * as Actions from './todos'
export function addTodo(action){
  return {type: Actions.ADD_TODO, action}
}

export function addTodoSucces(action){
  return {type: Actions.ADD_TODO_SUCCESS, action}
}
