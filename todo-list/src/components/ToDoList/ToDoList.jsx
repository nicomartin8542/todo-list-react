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

  handleClick() {
    console.log('this is:', this);
  }
  //Agrego Item al array
  addItem() {
    const form = {
      trabajo: this.state.trabajo,
      empresa: this.state.empresa,
      ciudad: this.state.ciudad,
      pais: this.state.pais,
    };

    this.setState({
      tasks: [...this.state.tasks, form],
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

    if (htmlParent.id === 'trabajo') {
      this.setState({
        trabajo: htmlParent.value || '',
      });
    }
    if (htmlParent.id === 'empresa') {
      this.setState({
        empresa: htmlParent.value || '',
      });
    }
    if (htmlParent.id === 'ciudad') {
      this.setState({
        ciudad: htmlParent.value || '',
      });
    }
    if (htmlParent.id === 'pais') {
      this.setState({
        pais: htmlParent.value || '',
      });
    }

    //Valido contenido
    this.btnVisible(e);
  }

  //Valido datos del formulario.
  btnVisible(e) {
    let inputsHtml = [];
    inputsHtml = e.target.parentElement.parentElement.querySelectorAll(
      '.datos input',
    );

    const input = Object.values(inputsHtml).some(
      input => input.value.length === 0,
    );

    if (input) {
      this.setState({
        visible: true,
      });
    } else {
      this.setState({
        visible: false,
      });
    }
  }

  //Elimino Item
  deleteItem(id) {
    const items = this.state.tasks;

    items.splice(id, 1);

    this.setState({
      tasks: [...items],
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

          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              onClick={() => this.addItem()}
              disabled={this.state.visible}
              className="btn btn-primary"
              type="button">
              Agregar
            </button>
          </div>
        </form>

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
            {this.state.tasks.map((task, index) => {
              return (
                <tr>
                  <td>{task.trabajo}</td>
                  <td>{task.empresa}</td>
                  <td>{task.ciudad}</td>
                  <td>{task.pais}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={index => this.deleteItem(index)}>
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
