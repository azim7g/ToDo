import React, { Component } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import EditForm from './EditForm';

const filter = [
    ['all', ' Все', 'Список всех задач', 'tasks'],
    ['active', ' Активные', 'Список активных задач', 'activeTasks'],
    ['finished', ' Завершенные', 'Список завершенных задач', 'finishedTasks'],
];

export default class TaskList extends Component {
  state = {
    filter: {
      state: 'all',
      title: 'Список всех задач',
      tasks: 'tasks',
    }
  };

  deleteTask = (id) => () => this.props.removeTask({ id });

  changeMode = (id) => () => this.props.enterEditMode({ id });

  checkboxHandler = (id) => (e) => {
    const status = e.target.checked ? 'finished' : 'active';
    this.props.changeStatus({ id, status })
  };

  renderTasks = tasks => {
    return (
        <>
          <h3 className="align-items-center mt-4 title">{this.state.filter.title}</h3>
          <TransitionGroup className="col-12">
            {
              tasks.map(task => {
                const color = task.status === 'active' ? 'violet' : 'blue';
                return (
                  <CSSTransition key={task.id} timeout={1000}>
                    <div className={`card mt-4 text-white ${color}`}>
                      {task.isEditMode
                        ? <EditForm task={task} />
                        : <>
                              <div className="card-header row justify-content-between overflow-hidden">
                                <h4 className="ml-3">{task.title}</h4>
                                <input
                                    type="checkbox"
                                    checked={task.status === 'active' ? false : true}
                                    className="checkbox"
                                    onChange={this.checkboxHandler(task.id)} />
                              </div>
                              {task.body
                                  ? <div className="card-body">
                                      <p className="card-text">{task.body}</p>
                                    </div>
                                  : null
                              }
                            </>
                      }
                        <div className="card-footer">
                          <button type="button" className="btn orange" onClick={this.deleteTask(task.id)} >Удалить </button>
                          <button type="button" className="btn orange" onClick={this.changeMode(task.id)} >Изменить</button>
                        </div>
                    </div>
                  </CSSTransition>
                )
              })
            }
          </TransitionGroup>
        </>
    )
  };

  render() {
    const curTasks = this.props[this.state.filter.tasks];
    const allTasks = this.props.tasks;
    if (allTasks.length === 0) return null;
    return (
      <div className="align-content-center mt-5 mb-5">
        <h4 className="title">Фильтр: </h4>
        {filter.map(([state, name, title, curTasks]) => {
          if (state === this.state.filter.state) {
            return <span key={state} className="btn btn-lignt text-white text">{name}</span>
          }
          return <button
            key={state}
            className={'btn btn-primary text'}
            onClick={() => {this.setState({filter: {state, title, tasks: curTasks}})}}
          >
            {name}
          </button>
        })}
        {this.renderTasks(curTasks)}
      </div>
    );
  }
}
