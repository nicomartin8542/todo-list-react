import React, { Component } from 'react';
import { alertaBorrar } from '../utils/alerts';
import { ToDoItem } from '../components/ToDo/ToDoItem';
import { ToDoList } from '../components/ToDo/ToDoList';

export class ToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      empresas: [],
      ciudades: [],
      paises: [],
      emp: [],
    };
  }

  //Recupero datos del localStorage
  componentDidMount() {
    const tasksStorage = JSON.parse(localStorage.getItem('tasks')) || [];
    const empresaStorage = JSON.parse(localStorage.getItem('empresas')) || [];
    const empStorage = JSON.parse(localStorage.getItem('emp')) || [];
    const ciudadStorage = JSON.parse(localStorage.getItem('ciudades')) || [];
    const paisStorage = JSON.parse(localStorage.getItem('paises')) || [];
    this.setState({
      tasks: tasksStorage,
      empresas: empresaStorage,
      ciudades: ciudadStorage,
      paises: paisStorage,
      emp: empStorage,
    });
  }

  //Guardo datos en localStorage
  componentDidUpdate() {
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  //Cargo Item
  actualizaTasks = task => {
    this.setState({
      tasks: [...this.state.tasks, task],
    });
  };

  //Elimino Item
  deleteItem = id => {
    const items = this.state.tasks.filter(task => task.id !== id);

    alertaBorrar().then(resp => {
      if (resp) {
        this.setState({
          tasks: [...items],
        });
      }
    });
  };

  render() {
    return (
      <>
        <ToDoItem
          actualizaTasks={this.actualizaTasks}
          empresas={this.state.empresas}
          ciudades={this.state.ciudades}
          paises={this.state.paises}
          emp={this.state.emp}
        />
        <ToDoList
          listado={this.state.tasks}
          deleteItem={this.deleteItem}
          empresas={this.state.emp}
          ciudades={this.state.ciudades}
          paises={this.state.paises}
        />
      </>
    );
  }
}
