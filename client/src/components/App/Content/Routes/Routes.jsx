import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "containers/Dashboard/Dashboard";
import CreateGame from "containers/CreateGame/CreateGame";
import JoinGame from "containers/JoinGame/JoinGame";
import GameContainer from "containers/GameContainer/GameContainer";
import Game from "containers/Game/Game";

const Routes = auth => {
  return (
    <Switch>
      <Route path="/" exact render={() => <Dashboard auth={false} />} />
      <Route path="/create" exact render={() => <CreateGame auth={false} />} />
      <Route path="/join" exact render={() => <JoinGame auth={false} />} />
      <Route
        path="/game/:id"
        exact
        render={() => <GameContainer auth={false} />}
      />
      <Route path="/testgame/:id" exact render={() => <Game auth={false} />} />
    </Switch>
  );
};

export default Routes;
