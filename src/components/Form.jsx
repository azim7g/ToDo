import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import { uniqueId } from 'lodash';

class Form extends Component {
    onSubmit = (formValues) => {
      const { addTask, reset } = this.props;
      addTask({ task: {
        ...formValues,
        id: uniqueId(),
        status: 'active',
        isEditMode: false,
      }});
      reset();
    };

    render(){
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <div className="form-group">
                  <Field
                    name="title"
                    component="input"
                    type="text"
                    className="form-control"
                    placeholder="Заголовок задачи..."
                    required
                  />
              </div>
              <div className="form-group">
                <Field
                  name="body"
                  component="input"
                  type="text"
                  className="form-control"
                  placeholder="Текст задачи..."
                />
              </div>
                <div className="text-center">
                    <button className="btn orange" type="submit">Добавить задачу</button>
                </div>
            </form>
        );
    }
}

Form = reduxForm({
    form: 'addTask', // имя формы в state (state.form.addTask)
})(Form);

export default connect(null, actionCreators)(Form);
