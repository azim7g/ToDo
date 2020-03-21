import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import { omit } from 'lodash';
import * as actions from '../actions';

const tasks = handleActions({
  [actions.addTask](state, { payload: { task } }) {
    return {
      ...state,
      [task.id]: task,
    };
  },
  [actions.removeTask](state, { payload: { id } }) {
    return omit(state, [id]);
  },
  [actions.editTask](state, { payload: { id, title, body } }) {
    return {
      ...state,
      [id]: { ...state[id], title, body }
    };
  },
  [actions.enterEditMode](state, { payload: { id } }) {
    return {
      ...state,
      [id]: { ...state[id], isEditMode: true },
    };
  },
  [actions.leaveEditMode](state, { payload: { id } }) {
    return {
      ...state,
      [id]: { ...state[id], isEditMode: false },
    };
  },
  [actions.changeStatus](state, { payload: { id, status } }) {
    return {
      ...state,
      [id]: { ...state[id], status }
    }
  }
}, {});

export default combineReducers({
  tasks,
  form: formReducer,
});
