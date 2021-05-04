import React, { Component } from 'react';

import { ToDoItem } from '../components/ToDo/ToDoItem';
import { ToDoList } from '../components/ToDo/ToDoList';

export class ToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };
  }

  //Recupero datos del localStorage
  componentDidMount() {
    const tasksStorage = JSON.parse(localStorage.getItem('tasks')) || [];
    this.setState({
      tasks: tasksStorage,
    });
  }

  //Cargo Item
  actualizaTasks = task => {
    this.setState(
      {
        tasks: [...this.state.tasks, task],
      },
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks)),
    );
  };

  //Elimino Item
  deleteItem = id => {
    const items = this.state.tasks.filter(task => task.id !== id);
    this.setState({
      tasks: [...items],
    });
  };

  render() {
    return (
      <>
        <ToDoItem actualizaTasks={this.actualizaTasks} />
        <ToDoList listado={this.state.tasks} deleteItem={this.deleteItem} />
      </>
    );
  }
}
