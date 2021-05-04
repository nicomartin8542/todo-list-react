import React, { Component } from 'react';
import { alertaBorrar } from '../utils/alerts';
import { EmpresaAlta } from '../components/Adminstracion/EmpresaAlta';

export class Empresas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresas: [],
      ciudades: [],
      paises: [],
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
    this.setState({
      empresas: empresaStorge,
      ciudades: ciudadesStorge,
      paises: paisesStorge,
    });
  }

  //Actualizo listado de paises
  actualizarEmpresas = empresas => {
    this.setState({
      empresas: [...this.state.empresas, empresas],
    });
  };

  //Elimino Paises
  eliminarEmpresas = id => {
    let items = JSON.parse(localStorage.getItem('empresas')).filter(
      item => item.id !== id,
    );

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
        />
      </>
    );
  }
}
