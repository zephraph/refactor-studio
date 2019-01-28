import * as React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Root from "./pages/root";

export default () => {
  return (
    <HashRouter hashType="noslash">
      <Switch>
        <Route exact path="/" component={Root} />
        <Route component={() => <h1>204 No Content</h1>} />
      </Switch>
    </HashRouter>
  );
};
