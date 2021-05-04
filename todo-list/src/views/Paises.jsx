import React from 'react';
import { alertaError, alertaBorrar } from '../utils/alerts';
import { PaisesAlta } from '../components/Adminstracion/PaisAlta';
export class Paises extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paises: [],
      ciudades: [],
    };
  }

  //Guardo datos en localStorage
  componentDidUpdate() {
    localStorage.setItem('paises', JSON.stringify(this.state.paises));
  }

  //Recupero datos del localStorage
  componentDidMount() {
    const paisesStorage = JSON.parse(localStorage.getItem('paises')) || [];
    const ciudadesStorage = JSON.parse(localStorage.getItem('ciudades')) || [];
    this.setState({
      paises: paisesStorage,
      ciudades: ciudadesStorage,
    });
  }

  //Actualizo listado de paises
  actualizarPaises = paises => {
    this.setState({
      paises: [...this.state.paises, paises],
    });
  };

  //Elimino Paises
  eliminarPais = id => {
    const ciudadPais = this.state.ciudades.some(c => c.pais === id);
    let items = JSON.parse(localStorage.getItem('paises')).filter(
      item => item.id !== id,
    );

    if (ciudadPais) {
      alertaError(
        'El pais que desea eliminar esta asociado a una ciudad. Verifique y vuelva a intentar',
      );
      return;
    }

    alertaBorrar().then(resp => {
      if (resp) {
        this.setState({
          paises: [...items],
        });
      }
    });
  };

  render() {
    return (
      <>
        <PaisesAlta
          actualizarPaises={this.actualizarPaises}
          listado={this.state.paises}
          eliminarPais={this.eliminarPais}
        />
      </>
    );
  }
}
