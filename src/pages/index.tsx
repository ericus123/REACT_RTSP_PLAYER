import LiveVideoWithWorker from "../components/PlayerWithWorker";

const WebSocketsPlayer = () => {
  // return <LiveVideo {...{ height: 1000, width: 1000 }} />;
  return <LiveVideoWithWorker {...{ height: 1000, width: 1000 }} />;
};

export default WebSocketsPlayer;
