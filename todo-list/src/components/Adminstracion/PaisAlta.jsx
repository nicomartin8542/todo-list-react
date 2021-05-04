import React from 'react';
import { validarImputForm, enterHandler } from '../../utils/util';

export class PaisesAlta extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pais: '',
      visible: true,
    };

    //Escucho evento press key enter
    enterHandler(this.state.visible, this.addItem);
  }

  //Obtengo item del imput
  addValue(e) {
    const htmlParent = e.target.parentElement.querySelector('input');
    this.setStateDatos(htmlParent.id, htmlParent.value);
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
  setStateDatos(clave, valor) {
    this.setState({
      [clave]: valor,
    });
  }

  //Cargo datos del formulario
  addItem = e => {
    if (e) {
      e.preventDefault();
    }

    const paisesOjb = {
      id: new Date().getTime(),
      nombre: this.state.pais,
    };

    this.props.actualizarPaises(paisesOjb);
    this.setStateDatos('pais', '');
  };

  render() {
    return (
      <>
        <form onSubmit={this.addItem}>
          <div>
            <h2 className="encabezado">
              Agregar Paises <hr />
            </h2>
          </div>
          <div className="datos mb-3">
            <label htmlFor="pais" className="form-label">
              Pais:
            </label>
            <input
              type="text"
              id="pais"
              className="form-control"
              placeholder="Pais"
              onChange={e => this.addValue(e)}
              onKeyDown={e => this.addValue(e)}
              value={this.state.pais}
              required
            />
          </div>

          <div className="d-grid gap-2 col-12 mx-auto">
            <button
              disabled={this.state.visible}
              className="btn btn-primary"
              type="submit">
              Agregar
            </button>
          </div>
        </form>

        {this.props.listado.length > 0 ? (
          <div className="table-responsive table-container ">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Pais</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {this.props.listado.map((p, index) => {
                  const { nombre, id } = p;
                  return (
                    <tr key={id}>
                      <td>{nombre}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => this.props.eliminarPais(id)}>
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
