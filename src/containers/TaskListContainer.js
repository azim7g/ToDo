import { connect } from 'react-redux';
import {createSelector} from 'reselect';
import * as actionCreators from '../actions';
import Component from '../components/TaskList';

const getTasks = state => state.tasks;

const tasksList = createSelector(
    getTasks,
    (tasks) => Object.values(tasks).reverse()
);

const activeTasks = createSelector(
    tasksList,
    (tasks) => tasks.filter(task => task.status === 'active')
);

const finishedTasks = createSelector(
    tasksList,
    (tasks) => tasks.filter(task => task.status === 'finished')
);

const mapStateToProps = state => ({
    tasks: tasksList(state),
    activeTasks: activeTasks(state),
    finishedTasks: finishedTasks(state),
});

export default connect(mapStateToProps, actionCreators)(Component);
