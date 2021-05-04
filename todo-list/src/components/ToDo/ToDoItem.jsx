import React from 'react';
import { validarImputForm } from '../../utils/util';

export class ToDoItem extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.state = {
      trabajo: '',
      empresa: '',
      ciudad: '',
      pais: '',
      visible: true,
    };
  }

  //Agrego Item al array
  addItem = e => {
    if (e) {
      e.preventDefault();
    }

    const { trabajo, empresa, ciudad, pais } = this.state;
    const form = {
      id: new Date().getTime(),
      trabajo: trabajo,
      empresa: empresa,
      ciudad: ciudad,
      pais: pais,
    };

    //Cargo array con lista para app.js
    this.props.actualizaTasks(form);

    this.setState({
      trabajo: '',
      empresa: '',
      ciudad: '',
      pais: '',
      visible: true,
    });
  };

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
      </>
    );
  }
}
