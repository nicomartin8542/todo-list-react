import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid ">
        <Link className="navbar-brand" to="/">
          Listas de Trabajos
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/paises">
                Paises
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ciudades">
                Ciudades
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/empresas">
                Empresas
              </Link>
            </li>
          </ul>
          <span className="navbar-text">MERN - Curso de React</span>
        </div>
      </div>
    </nav>
  </header>
);
