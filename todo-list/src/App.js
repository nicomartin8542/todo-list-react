import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './views/Header';
import { ToDo } from './views/ToDo';
import { Footer } from './views/Footer';
import { Paises } from './views/Paises';
import { Ciudades } from './views/Ciudades';
import { Empresas } from './views/Empresas';
import { Empresa } from './views/Empresa';
import { PageNoFound } from './views/PageNoFound';

//Importo css
import './app.css';

const App = () => (
  <Fragment>
    <Header />
    <main>
      <Switch>
        <Route path="/" exact component={ToDo} />
        <Route path="/paises" exact component={Paises} />
        <Route path="/ciudades" exact component={Ciudades} />
        <Route path="/empresas" exact component={Empresas} />
        <Route path="/emp" exact component={Empresa} />
        <Route component={PageNoFound} />
      </Switch>
    </main>
    <Footer />
  </Fragment>
);

export default App;
