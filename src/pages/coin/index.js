import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import BuyCoin from "../buy-coin";
import SellCoin from "../sell-coin";

const Coin = () => {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}/buy`}>
        <BuyCoin />
      </Route>
      <Route exact path={`${match.url}/sell`}>
        <SellCoin />
      </Route>
    </Switch>
  );
};

export default Coin;
