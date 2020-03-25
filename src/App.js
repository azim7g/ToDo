import React, { Component } from 'react';
import Form from './components/Form';
import TaskListContainer from "./containers/TaskListContainer";

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center text-white m-4">To Do</h1>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">         
            <Form />
          </div>
          <div className="col-12 col-lg-10">
            <TaskListContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
