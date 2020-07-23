import React from "react";
import { Switch, Route } from "react-router-dom";
import * as Loadable from "./Loadable";
import CreateGame from "../../../../containers/CreateGame/CreateGame";
import JoinGame from "../../../../containers/JoinGame/JoinGame";
import GameContainer from "../../../../containers/GameContainer/GameContainer";

const Routes = auth => {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => <Loadable.Dashboard auth={false} />}
      />
      <Route path="/create" exact render={() => <CreateGame auth={false} />} />
      <Route path="/join" exact render={() => <JoinGame auth={false} />} />
      <Route
        path="/game/:id"
        exact
        render={() => <GameContainer auth={false} />}
      />
    </Switch>
  );
};

export default Routes;
