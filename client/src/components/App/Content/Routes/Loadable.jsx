import Loadable from "react-loadable";
import React from "react";
import FullScreenLoader from "components/FullScreenLoader/FullScreenLoader";

const Dashboard = Loadable({
  loader: () => import(`containers/Dashboard/Dashboard`),
  loading() {
    return <FullScreenLoader />;
  }
});

export { Dashboard };
