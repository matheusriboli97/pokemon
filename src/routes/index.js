import React from 'react';
import { Switch  } from 'react-router-dom';

import Home from '../views/Home/Home';
import SelectPokemon from '../views/SelectPokemon/SelectPokemon';
import NotFound from '../views/NotFound/NotFound';
import Route from './routes';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/select-pk" component={SelectPokemon} />
    <Route component={NotFound} />
  </Switch>
);
export default Routes;
