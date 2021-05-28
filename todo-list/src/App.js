import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './views/Header';
import { Jobs } from './views/Jobs';
import { Footer } from './views/Footer';
import { Countries } from './views/Countries';
import { Places } from './views/Places';
import { Organizations } from './views/Organizations';
import { PageNoFound } from './views/PageNoFound';

//Importo css
import './app.css';

const App = () => (
  <Fragment>
    <Header />
    <main>
      <Switch>
        <Route path="/" exact component={Jobs} />
        <Route path="/countries" exact component={Countries} />
        <Route path="/places" exact component={Places} />
        <Route path="/organizations" exact component={Organizations} />
        <Route component={PageNoFound} />
      </Switch>
    </main>
    <Footer />
  </Fragment>
);

export default App;
