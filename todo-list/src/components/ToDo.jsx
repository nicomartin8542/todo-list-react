import React, { Component } from 'react';
import { Header } from './Header/Header';
import { ToDoItem } from './ToDoItem/ToDoItem';
import { ToDoList } from './ToDoList/ToDoList';

export class ToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };
  }

  //Cargo Item
  actualizaTasks = task => {
    this.setState({
      tasks: [...this.state.tasks, task],
    });
  };

  //Elimino Item
  deleteItem = id => {
    const items = this.state.tasks;
    items.splice(id, 1);
    this.setState({
      tasks: [...items],
    });
  };

  render() {
    return (
      <>
        <Header />
        <ToDoItem actualizaTasks={this.actualizaTasks} />
        <ToDoList listado={this.state.tasks} deleteItem={this.deleteItem} />
      </>
    );
  }
}
