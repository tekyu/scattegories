import { combineReducers } from "redux";
import { appReducer } from "./app/appReducer";
import { socketReducer } from "./socket/socketReducer";
import { userReducer } from "./user/userReducer";
import { roomReducer } from "./room/roomReducer";
import { gameReducer } from "./game/gameReducer";

export default combineReducers({
  app: appReducer,
  socket: socketReducer,
  user: userReducer,
  room: roomReducer,
  game: gameReducer
});
