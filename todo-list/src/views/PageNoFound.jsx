import { Link } from 'react-router-dom';

export const PageNoFound = () => (
  <div className="paginaNoEncontrada">
    <p>Page not found</p>
    <Link className="btn btn-success" to="/">
      Back to Home
    </Link>
  </div>
);
