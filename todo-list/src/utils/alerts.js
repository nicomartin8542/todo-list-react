//Imports
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

//Variables
const MySwal = withReactContent(Swal);

//Metodos
export const alertaError = mensaje => {
  MySwal.fire({
    icon: 'error',
    title: 'Error al Eliminar',
    text: mensaje,
  });
};

export const alertaBorrar = () => {
  return MySwal.fire({
    title: '¿Seguro que desea borrar?',
    text: 'Una vez eliminado no se podra recuperar el dato.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!',
  }).then(result => {
    if (result.isConfirmed) {
      MySwal.fire('Eliminado!', 'El registro se borro con exito.', 'success');
      return true;
    } else {
      return false;
    }
  });
};
