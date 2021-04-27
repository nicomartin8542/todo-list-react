import React from 'react';

export class ToDoList extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      trabajo: '',
      empresa: '',
      ciudad: '',
      pais: '',
      visible: true,
    };

    //Escucho evento press key enter
    document.addEventListener('keypress', e => {
      if (this.state.visible === false && e.code === 'Enter') {
        this.addItem();
      }
    });
  }

  //Agrego Item al array
  addItem() {
    const form = {
      trabajo: this.state.trabajo,
      empresa: this.state.empresa,
      ciudad: this.state.ciudad,
      pais: this.state.pais,
    };

    //Cargo array con lista para app.js
    this.props.actualizaTasks(...this.state.tasks, form);

    this.setState({
      tasks: [],
      trabajo: '',
      empresa: '',
      ciudad: '',
      pais: '',
      visible: true,
    });
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
    let inputsHtml = e.target.parentElement.parentElement.querySelectorAll(
      '.datos input',
    );

    const input = Object.values(inputsHtml).some(
      input => input.value.length === 0,
    );

    if (input) {
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
        <form>
          <div className="datos mb-3">
            <label htmlFor="trabajo" className="form-label">
              Trabajo:
            </label>
            <input
              type="text"
              id="trabajo"
              className="form-control"
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
              onChange={e => this.addValue(e)}
              onKeyDown={e => this.addValue(e)}
              value={this.state.pais}
              required
            />
          </div>

          <div className="d-grid gap-2 col-2 mx-auto">
            <button
              onClick={() => this.addItem()}
              disabled={this.state.visible}
              className="btn btn-primary"
              type="button">
              Agregar
            </button>
          </div>
        </form>
      </>
    );
  }
}
