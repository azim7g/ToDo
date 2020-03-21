import { createAction } from 'redux-actions';

export const addTask = createAction('TASK_ADD');
export const removeTask = createAction('TASK_REMOVE');
export const editTask = createAction('TASK_EDIT');

export const enterEditMode = createAction('EDIT_MODE_ENTER');
export const leaveEditMode = createAction('EDIT_MODE_LEAVE');

export const changeStatus = createAction('STATUS_CHANGE');
