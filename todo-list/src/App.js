import React from 'react';
import { Header } from './components/Header/Header';
import { ToDoList } from './components/ToDoList/ToDoList';
import { List } from './components/List/List';

//Importo css
import './app.css';

class App extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };
    this.actualizaTasks = this.actualizaTasks.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  //Cargo Item
  actualizaTasks(task) {
    this.setState({
      tasks: [...this.state.tasks, task],
    });
  }

  //Elimino Item
  deleteItem(id) {
    const items = this.state.tasks;
    items.splice(id, 1);
    this.setState({
      tasks: [...items],
    });
  }

  render() {
    return (
      <>
        <Header />
        <ToDoList actualizaTasks={this.actualizaTasks} />
        <List listado={this.state.tasks} deleteItem={this.deleteItem} />
      </>
    );
  }
}
export default App;
