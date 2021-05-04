import React, { Component } from 'react';
import { validarImputForm } from '../../utils/util';

export class CiudadAlta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ciudad: '',
      pais: 0,
      visible: true,
    };
  }

  //Obtengo item del imput
  addValue(e) {
    let htmlParent;
    if (e.target.id !== 'pais') {
      htmlParent = e.target.parentElement.querySelector('input');
    } else {
      htmlParent = e.target;
    }
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

    const { ciudad, pais } = this.state;

    const ciudadObj = {
      id: new Date().getTime(),
      nombre: ciudad,
      pais: Number(pais),
    };

    //Actualizo array de ciudades
    this.props.actualizarCiudades(ciudadObj);
    //Limpio variables
    this.setStateDatos('ciudad', '');
    //Reseteo form
    e.target.reset();
    //Validos campos luego de resetear forms
    this.btnVisible(e);
  };

  render() {
    return (
      <>
        <form onSubmit={this.addItem}>
          <div>
            <h2 className="encabezado">
              Agregar Ciudades <hr />
            </h2>
          </div>
          <div className="datos mb-3">
            <label htmlFor="ciudad" className="form-label">
              Ciudad:
            </label>
            <input
              type="text"
              id="ciudad"
              className="form-control"
              placeholder="Ciudad"
              onChange={e => this.addValue(e)}
              onKeyDown={e => this.addValue(e)}
              value={this.state.ciudad}
              required
            />
          </div>

          <div className="datos mb-3">
            <label htmlFor="pais" className="form-label">
              Pais:
            </label>
            <select
              className="form-select"
              id="pais"
              onChange={e => this.addValue(e)}
              onKeyDown={e => this.addValue(e)}
              required>
              <option value="0">Seleccione</option>
              {this.props.paises.map(pais => {
                const { nombre, id } = pais;
                return (
                  <option key={id} value={id}>
                    {nombre}
                  </option>
                );
              })}
            </select>
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
                  <th>Ciudad</th>
                  <th>Pais</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {this.props.listado.map((c, index) => {
                  const { nombre, pais, id } = c;
                  let paisNombre = this.props.paises.filter(p => p.id === pais);

                  return (
                    <tr key={id}>
                      <td>{nombre}</td>
                      <td>{paisNombre[0].nombre}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => this.props.eliminarCiudad(id)}>
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
