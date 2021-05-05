import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { validarImputForm } from '../../utils/util';

export class EmpAlta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresa: '',
      visible: true,
    };
  }

  //Obtengo item del imput
  addValue(e) {
    this.setStateDatos(e.target.id, e.target.value);
    //Valido contenido
    this.btnVisible(e);
  }

  //Valido datos del formulario.
  btnVisible(e) {
    if (validarImputForm(e)) {
      this.setStateDatos('visible', true);
    } else {
      this.setStateDatos('visible', false);
    }
  }

  //Metodo para actualizar datos del state
  setStateDatos = (clave, valor) => {
    this.setState({
      [clave]: valor,
    });
  };

  //Cargo datos del formulario
  addItem = e => {
    if (e) {
      e.preventDefault();
    }

    const { empresa } = this.state;

    const empresaObj = {
      id: new Date().getTime(),
      nombre: empresa,
    };

    this.props.actualizarEmp(empresaObj);
    this.setStateDatos('empresa', '');
    this.setStateDatos('visible', true);
  };

  render() {
    return (
      <>
        <form onSubmit={this.addItem}>
          <div>
            <h2 className="encabezado">
              Agregar Empresas <hr />
            </h2>
          </div>
          <div className="datos mb-3">
            <label htmlFor="empresa" className="form-label">
              Empresa:
            </label>
            <input
              type="text"
              id="empresa"
              className="form-control"
              placeholder="Empresa"
              onChange={e => this.addValue(e)}
              onKeyDown={e => this.addValue(e)}
              value={this.state.empresa}
              required
            />
          </div>

          <div className="d-grid gap-2">
            <button
              disabled={this.state.visible}
              className="btn btn-primary"
              type="submit">
              Agregar
            </button>
            <Link className="btn btn-success" to="/empresas">
              Volver
            </Link>
          </div>
        </form>

        {this.props.listado.length > 0 ? (
          <div className="table-responsive table-container ">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {this.props.listado.map(e => {
                  const { nombre, id } = e;

                  return (
                    <tr key={id}>
                      <td>{nombre}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => this.props.eliminarEmp(id)}>
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="sinResultados table-container">
            <p className="encabezado">No hay resultados</p>
          </div>
        )}
      </>
    );
  }
}
