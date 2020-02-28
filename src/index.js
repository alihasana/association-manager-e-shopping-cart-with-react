import React, {Component, Suspense} from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import ReactDOM from "react-dom";
import routes from './routes'

class App extends Component {
  render() {
    const menu = routes.map((route, index) => {
      return (route.component) ? (
          <Route
              key={index}
              path={route.path}
              exact={route.exact}
              name={route.name}
              render={props => (
                  <route.component {...props} />
              )} />
      ) : (null);
    });
    return (
      <Suspense fallback={<div>Loading.......</div>}>
        <BrowserRouter>
        <Switch>
          {menu}
          <Redirect to="/sadmin/shopping/dashboard" />
        </Switch>
        </BrowserRouter>
      </Suspense>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("root"));
