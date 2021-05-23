import { Link } from 'react-router-dom';

export const PageNoFound = () => (
  <div className="paginaNoEncontrada">
    <p>Pagina no encontrada</p>
    <Link className="btn btn-success" to="/">
      Volver Al inicio
    </Link>
  </div>
);
