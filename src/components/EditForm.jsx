import { Field, reduxForm } from 'redux-form';
import React, { Component } from 'react';
import {connect} from "react-redux";
import * as actionCreators from './../actions/index';

class EditForm extends Component {
  componentDidMount() {
      const { title, body } = this.props.task;
      this.props.initialize({ title, body })
  }

    onSubmit = (formValues) => {
      const { task, reset, editTask, leaveEditMode } = this.props;
        editTask({ id: task.id, ...formValues });
        leaveEditMode({ id: task.id })
        reset()
  };

  changeModeToLeave = (id) => () => this.props.leaveEditMode({ id });

  render() {
    const { handleSubmit, task } = this.props;
    const classes = task.status === 'active' ? 'editField' : 'editField finished';
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="title"
          component="input"
          type="text"
          className={classes}
          required
        />
        <Field
          name="body"
          component="input"
          type="text"
          className={classes}
        />
        <div>
            <button type="submit" className="btn orange edit-button">Готово</button>
        </div>
      </form>
    );
  }
}

EditForm = reduxForm({
    form: 'editTask',
})(EditForm);

export default connect(null, actionCreators)(EditForm)
