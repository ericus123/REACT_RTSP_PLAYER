import { FC } from "react";
import { WsPlayerProps } from "../../types";
import PlayerWithWorker from "./PlayerWithWorker";
import PlayerWithoutWorker from "./PlayerWithoutWorker";

const Player: FC<WsPlayerProps> = (props) => {
  return (
    <div>
      {props?.withWorker ? (
        <PlayerWithWorker {...props} />
      ) : (
        <PlayerWithoutWorker {...props} />
      )}
    </div>
  );
};

export default Player;
