import React, { Component } from 'react';
import { alertaBorrar, alertaError } from '../utils/alerts';
import { EmpresaAlta } from '../components/Adminstracion/EmpresaAlta';

export class Empresas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresas: [],
      ciudades: [],
      paises: [],
      emp: [],
      tasks: [],
    };
  }

  //Guardo datos en localStorage
  componentDidUpdate() {
    localStorage.setItem('empresas', JSON.stringify(this.state.empresas));
  }

  //Recupero datos del localStorage
  componentDidMount() {
    const empresaStorge = JSON.parse(localStorage.getItem('empresas')) || [];
    const ciudadesStorge = JSON.parse(localStorage.getItem('ciudades')) || [];
    const paisesStorge = JSON.parse(localStorage.getItem('paises')) || [];
    const empStorge = JSON.parse(localStorage.getItem('emp')) || [];
    const tasksStorge = JSON.parse(localStorage.getItem('tasks')) || [];

    this.setState({
      empresas: empresaStorge,
      ciudades: ciudadesStorge,
      paises: paisesStorge,
      emp: empStorge,
      tasks: tasksStorge,
    });
  }

  //Actualizo listado de paises
  actualizarEmpresas = empresas => {
    this.setState({
      empresas: [...this.state.empresas, empresas],
    });
  };

  //Elimino Paises
  eliminarEmpresas = (id, empresa, ciudad) => {
    const empresaTask = this.state.tasks.some(
      rsp => rsp.empresa === empresa && rsp.ciudad === ciudad,
    );

    let items = JSON.parse(localStorage.getItem('empresas')).filter(
      item => item.id !== id,
    );

    if (empresaTask) {
      alertaError(
        'La empresa que desea eliminar esta asociado a un puesto de trabajo. Verifique y vuelva a intentar',
      );
      return;
    }

    //Muestro alerta
    alertaBorrar().then(resp => {
      if (resp) {
        //Elimino registro
        this.setState({
          empresas: [...items],
        });
      }
    });
  };

  render() {
    return (
      <>
        <EmpresaAlta
          actualizarEmpresas={this.actualizarEmpresas}
          listado={this.state.empresas}
          eliminarEmpresas={this.eliminarEmpresas}
          paises={this.state.paises}
          ciudades={this.state.ciudades}
          emp={this.state.emp}
        />
      </>
    );
  }
}
