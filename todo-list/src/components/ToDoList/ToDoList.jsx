import React from 'react';

export class ToDoList extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <ul>
          <li>Hola mundo</li>
        </ul>

        <div className="container">
          <label htmlFor="trabajo">Trabajo</label>
          <input type="text" id="trabajo" />
        </div>

        <br />
        <div className="container">
          <input type="text" id="" />
        </div>
        <br />

        <div className="container">
          <input type="text" id="" />
        </div>

        <br />
        <button>Agregar</button>
      </>
    );
  }
}
