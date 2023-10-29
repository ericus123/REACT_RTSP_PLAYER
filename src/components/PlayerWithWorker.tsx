import { useEffect, useRef } from "react";

const LiveVideoWithWorker = ({
  height,
  width,
}: {
  height: number;
  width: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!workerRef.current) {
      // Create a web worker when the component mounts
      workerRef.current = new Worker(
        new URL("../components/Player.worker.js", import.meta.url),
      );

      workerRef.current.onmessage = (e) => {
        const message = e.data;
        if (message.type === "open") {
          console.log("WebSocket connection opened.");
        } else if (message.type === "close") {
          console.log("WebSocket connection closed.", message.event);
        } else if (message.type === "error") {
          console.error("WebSocket error:", message.error);
        } else if (message.type === "image") {
          const image = new Image();
          image.onload = () => {
            if (ctx) {
              // Clear the canvas
              ctx.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
              // Draw the image on the canvas
              ctx.drawImage(image, 0, 0, image.width, image.height);
            }
          };
          image.src = message.blobURL;
        }
      };
    }

    // Send a message to the web worker to start the WebSocket connection
    workerRef.current.postMessage("start");

    return () => {
      console.log("Component unmounted. Closing WebSocket connection.");
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
        width={width}
        height={height}
      />
    </div>
  );
};

export default LiveVideoWithWorker;
