import React, { Component } from 'react';

export class List extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <hr />
        <h1 className="encabezado">Listado de trabajos</h1>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Trabajo</th>
              <th>Empresa</th>
              <th>Cidudad</th>
              <th>Pais</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {this.props.listado.map((task, index) => {
              return (
                <tr key={index}>
                  <td>{task.trabajo}</td>
                  <td>{task.empresa}</td>
                  <td>{task.ciudad}</td>
                  <td>{task.pais}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={index => this.props.deleteItem(index)}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}
