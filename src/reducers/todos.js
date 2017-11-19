
import { handleActions } from 'redux-actions';

const initialState = [{
  text: 'Use Redux',
  completed: false,
  id: 0,
}];

export default handleActions({
  'add todo': function (state, action) {
    return [{
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      text: action.payload,
    }, ...state];
  },

  'delete todo': function (state, action) {
    return state.filter(todo => todo.id !== action.payload);
  },

  'edit todo': function (state, action) {
    return state.map(todo => (todo.id === action.payload.id
      ? { ...todo, text: action.payload.text }
      : todo));
  },

  'complete todo': function (state, action) {
    return state.map(todo => (todo.id === action.payload
      ? { ...todo, completed: !todo.completed }
      : todo));
  },

  'complete all': function (state) {
    const areAllMarked = state.every(todo => todo.completed);
    return state.map(todo => ({
      ...todo,
      completed: !areAllMarked,
    }));
  },

  'clear complete': function (state) {
    return state.filter(todo => todo.completed === false);
  },
}, initialState);
