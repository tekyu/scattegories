import Loadable from "react-loadable";
import React from "react";
import FullScreenLoader from "../../../FullScreenLoader/FullScreenLoader";

// const Login = Loadable({
//   loader: () => import(`containers/Auth/Login/LoginForm`),
//   loading() {
//     return <FullScreenLoader />;
//   }
// });

// const Register = Loadable({
//   loader: () => import(`containers/Auth/Register/RegisterForm`),
//   loading() {
//     return <FullScreenLoader />;
//   }
// });

// const Logout = Loadable({
//   loader: () => import(`containers/Auth/Logout/Logout`),
//   loading() {
//     return <FullScreenLoader />;
//   }
// });

const Dashboard = Loadable({
  loader: () => import(`containers/Dashboard/Dashboard`),
  loading() {
    return <FullScreenLoader />;
  }
});

// const CreateGame = Loadable({
//   loader: () => import(`containers/CreateGame/CreateGame`),
//   loading() {
//     return <FullScreenLoader />;
//   }
// });

// const GameContainer = Loadable({
//   loader: () => import(`containers/GameContainer/GameContainer`),
//   loading() {
//     return <FullScreenLoader />;
//   }
// });

// const Profile = Loadable({
//   loader: () => import(`containers/Profile/Profile`),
//   loading() {
//     return <FullScreenLoader />;
//   }
// });

export { Dashboard };
