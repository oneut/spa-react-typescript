import * as React from 'react';
import { Route, Switch } from "react-router";
import Header from './layouts/Header';
import IndexPage from "./pages/IndexPage";
import NewsPage from "./pages/NewsPage";

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route exact={true} path='/' render={IndexPage} />
      <Route exact={true} path='/news/:page' render={NewsPage} />
    </Switch>
  </div>
);
export default App;
