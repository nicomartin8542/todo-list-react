import React from 'react';
import { alertaError, alertaBorrar } from '../utils/alerts';
import { EmpAlta } from '../components/Adminstracion/EmpAlta';
export class Empresa extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emp: [],
      empresas: [],
    };
  }

  //Guardo datos en localStorage
  componentDidUpdate() {
    localStorage.setItem('emp', JSON.stringify(this.state.emp));
  }

  //Recupero datos del localStorage
  componentDidMount() {
    const empStorage = JSON.parse(localStorage.getItem('emp')) || [];
    const empresasStorage = JSON.parse(localStorage.getItem('empresas')) || [];
    this.setState({
      emp: empStorage,
      empresas: empresasStorage,
    });
  }

  //Actualizo listado de paises
  actualizarEmp = emp => {
    this.setState({
      emp: [...this.state.emp, emp],
    });
  };

  //Elimino Paises
  eliminarEmp = id => {
    const empEmpresas = this.state.empresas.some(e => e.id === id);
    let items = JSON.parse(localStorage.getItem('emp')).filter(
      item => item.id !== id,
    );

    if (empEmpresas) {
      alertaError(
        'La empresa que desea eliminar ya esta referenciada a un pais. Verifique y vuelva a intentar',
      );
      return;
    }

    alertaBorrar().then(resp => {
      if (resp) {
        this.setState({
          emp: [...items],
        });
      }
    });
  };

  render() {
    return (
      <>
        <EmpAlta
          actualizarEmp={this.actualizarEmp}
          listado={this.state.emp}
          eliminarEmp={this.eliminarEmp}
        />
      </>
    );
  }
}
