import { FC } from "react";
import Player from "../components/players/Player";
import { WsPlayerProps } from "../types";

const WebSocketsPlayer: FC<WsPlayerProps> = (props) => {
  return <Player {...props} />;
};

export default WebSocketsPlayer;
