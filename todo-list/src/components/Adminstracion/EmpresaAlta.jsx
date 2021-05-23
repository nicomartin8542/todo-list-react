import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { validarImputForm } from '../../utils/util';

export class EmpresaAlta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresa: 0,
      ciudades: [],
      ciudad: 0,
      pais: 0,
      visible: true,
    };
  }

  //Obtengo item del imput
  addValue(e) {
    let htmlValue = e.target;

    if (e.target.id === 'pais') {
      this.cargarCiudades(e);
    }

    this.setStateDatos(htmlValue.id, htmlValue.value);
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
      empresa: Number(empresa),
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
          <div className="datos input-group mb-3">
            <select
              className="form-select"
              id="empresa"
              name="empresa"
              onChange={e => this.addValue(e)}
              onKeyDown={e => this.addValue(e)}
              required>
              <option value="0">Empresas</option>
              {this.props.emp.map(e => {
                const { nombre, id } = e;
                return (
                  <option key={id} value={id}>
                    {nombre}
                  </option>
                );
              })}
            </select>

            <Link
              className="btn btn-success"
              type="button"
              id="button-addon2"
              to="/emp">
              Agregar
            </Link>
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
                  const { empresa, pais, ciudad, id } = e;
                  let paisNombre = this.props.paises.filter(p => p.id === pais);
                  let empEmpresa = this.props.emp.filter(
                    emp => emp.id === Number(empresa),
                  );
                  let ciudadNombre = this.props.ciudades.filter(
                    c => c.id === ciudad,
                  );
                  return (
                    <tr key={index}>
                      <td>{empEmpresa[0].nombre}</td>
                      <td>{paisNombre[0].nombre}</td>
                      <td>
                        {ciudadNombre.length > 0 ? ciudadNombre[0].nombre : ''}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            this.props.eliminarEmpresas(id, empresa, ciudad)
                          }>
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
