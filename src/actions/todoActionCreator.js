
import * as Actions from './todos'
export function addTodo(action){
  return {type: Actions.ADD_TODO, action}
}

export function addTotoWithDispatch(action){
  return (dispatch)=>{
    dispatch(addTodo(action))
  }
}