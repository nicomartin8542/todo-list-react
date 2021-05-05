import React from 'react';
import { validarImputForm } from '../../utils/util';

export class ToDoItem extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.state = {
      trabajo: '',
      empresa: 0,
      ciudad: 0,
      ciudades: [],
      visible: true,
    };
  }

  //Agrego Item al array
  addItem = e => {
    if (e) {
      e.preventDefault();
    }

    const { trabajo, empresa, ciudad } = this.state;

    //Creo objeto con los datos cargados
    const form = {
      id: new Date().getTime(),
      trabajo: trabajo,
      empresa: Number(empresa),
      ciudad: Number(ciudad),
    };

    //Cargo array con lista para app.js
    this.props.actualizaTasks(form);

    this.setState({
      trabajo: '',
      empresa: 0,
      ciudad: 0,
      ciudades: [],
    });

    //Reseto Formulario
    e.target.reset();
    //Valido contenido
    this.btnVisible(e);
  };

  //Obtengo item del imput
  addValue(e) {
    const html = e.target;

    //Seteo variables del state
    this.setStateDatos(html.id, html.value);

    //Cargo select de ciuades
    if (html.id === 'empresa') {
      this.agregarSelectCiudad(Number(html.value));
    }

    //Valido contenido
    this.btnVisible(e);
  }

  agregarSelectCiudad(id) {
    const empresaSelect = this.props.empresas.filter(e => e.empresa === id);
    let ciudades = [];

    empresaSelect.forEach(e => {
      let array = this.props.ciudades.find(c => c.id === e.ciudad) || [];

      ciudades = [...ciudades, array];
    });

    this.setStateDatos('ciudades', ciudades);
  }

  //Valido datos del formulario.
  btnVisible(e) {
    if (validarImputForm(e)) {
      this.setStateDatos('visible', true);
    } else {
      this.setStateDatos('visible', false);
    }
  }

  //Metodo para actualizar datos
  setStateDatos(clave, valor) {
    this.setState({
      [clave]: valor,
    });
  }

  //Recargo pagina
  render() {
    return (
      <>
        <form onSubmit={this.addItem}>
          <div className="datos mb-3">
            <label htmlFor="trabajo" className="form-label">
              Trabajo:
            </label>
            <input
              type="text"
              id="trabajo"
              className="form-control"
              placeholder="Trabajo"
              onChange={e => this.addValue(e)}
              onKeyDown={e => this.addValue(e)}
              value={this.state.trabajo}
              required
            />
          </div>

          <div className="datos mb-3">
            <label htmlFor="empresa" className="form-label">
              Empresa:
            </label>
            <select
              className="form-select"
              id="empresa"
              onChange={e => this.addValue(e)}
              onKeyDown={e => this.addValue(e)}
              required>
              <option value="0">Seleccione</option>
              {this.props.emp.map((e, index) => {
                const { nombre, id } = e;
                return (
                  <option key={index} value={id}>
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
              {this.state.ciudades.map((c, index) => {
                const { nombre, id, pais } = c;
                const pc = this.props.paises.filter(c => c.id === pais) || [];

                return (
                  <option key={index} value={id}>
                    {nombre} - {pc[0].nombre}
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
      </>
    );
  }
}
