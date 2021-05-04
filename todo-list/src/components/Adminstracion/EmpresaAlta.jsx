import React, { Component } from 'react';
import { validarImputForm } from '../../utils/util';

export class EmpresaAlta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresa: '',
      ciudades: [],
      ciudad: 0,
      pais: 0,
      visible: true,
    };
  }

  //Obtengo item del imput
  addValue(e) {
    let htmlParent;
    if (e.target.id !== 'pais' && e.target.id !== 'ciudad') {
      htmlParent = e.target.parentElement.querySelector('input');
    } else {
      htmlParent = e.target;
    }

    if (e.target.id === 'pais') {
      this.cargarCiudades(e);
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

    const { ciudad, pais, empresa } = this.state;

    const empresaObj = {
      id: new Date().getTime(),
      nombre: empresa,
      ciudad: Number(ciudad),
      pais: Number(pais),
    };

    this.props.actualizarEmpresas(empresaObj);
    this.setStateDatos('empresa', '');
    this.setStateDatos('ciudades', []);
    e.target.reset();
    this.btnVisible(e);
  };

  //Cargo array de ciudades de acuerdo a los paises
  cargarCiudades(e) {
    const pais = Number(e.target.value);
    const ciudades = this.props.ciudades.filter(ciudad => ciudad.pais === pais);
    if (pais === '0') {
      this.setStateDatos('ciudades', []);
    } else {
      this.setStateDatos('ciudades', ciudades);
    }
  }

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

          <div className="datos mb-3">
            <label htmlFor="ciudad" className="form-label">
              Ciudad:
            </label>
            <select
              className="form-select"
              id="ciudad"
              onChange={e => this.addValue(e)}
              onKeyDown={e => this.addValue(e)}
              required>
              <option value="0">Seleccione</option>
              {this.state.ciudades.map(ciudad => {
                const { nombre, id } = ciudad;
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
                  <th>Empresa</th>
                  <th>Pais</th>
                  <th>Ciudad</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {this.props.listado.map((e, index) => {
                  const { nombre, pais, ciudad, id } = e;
                  let paisNombre = this.props.paises.filter(p => p.id === pais);
                  let ciudadNombre = this.state.ciudades.filter(
                    c => c.id === ciudad,
                  );
                  return (
                    <tr key={id}>
                      <td>{nombre}</td>
                      <td>{paisNombre[0].nombre}</td>
                      <td>{ciudadNombre.length > 0 ? [0].nombre : ''}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => this.props.eliminarEmpresas(id)}>
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
