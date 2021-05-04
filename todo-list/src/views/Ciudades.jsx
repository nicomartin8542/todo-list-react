import React from 'react';
import { alertaError, alertaBorrar } from '../utils/alerts';
import { CiudadAlta } from '../components/Adminstracion/CiudadAlta';

export class Ciudades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ciudades: [],
      empresas: [],
      paises: [],
    };
  }

  //Guardo datos en localStorage
  componentDidUpdate() {
    localStorage.setItem('ciudades', JSON.stringify(this.state.ciudades));
  }

  //Recupero datos del localStorage
  componentDidMount() {
    const ciudadStorage = JSON.parse(localStorage.getItem('ciudades')) || [];
    const empresaStorage = JSON.parse(localStorage.getItem('empresas')) || [];
    const paisStorage = JSON.parse(localStorage.getItem('paises')) || [];
    this.setState({
      ciudades: ciudadStorage,
      empresas: empresaStorage,
      paises: paisStorage,
    });
  }

  //Actualizo listado de paises
  actualizarCiudades = ciudades => {
    this.setState({
      ciudades: [...this.state.ciudades, ciudades],
    });
  };

  //Elimino Paises
  eliminarCiudad = id => {
    let ciudadEmpresa = this.state.empresas.some(e => e.ciudad === id);
    let items = JSON.parse(localStorage.getItem('ciudades')).filter(
      item => item.id !== id,
    );

    //Valido que la ciudad no este cargada para una empresa
    if (ciudadEmpresa) {
      alertaError(
        'La ciudad que desea eliminar esta asociada a una empresa. Verifique y vuelva a intentar',
      );
      return;
    }

    //Muestro alerta
    alertaBorrar().then(resp => {
      if (resp) {
        //Elimino registro
        this.setState({
          ciudades: [...items],
        });
      }
    });
  };

  render() {
    return (
      <CiudadAlta
        actualizarCiudades={this.actualizarCiudades}
        listado={this.state.ciudades}
        eliminarCiudad={this.eliminarCiudad}
        paises={this.state.paises}
      />
    );
  }
}
