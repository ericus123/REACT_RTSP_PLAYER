import { useEffect, useRef } from "react";

const LiveVideo = ({ height, width }: { height: number; width: number }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }

    const switchDevices = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      socketRef.current = new WebSocket(`${process.env.NEXT_PUBLIC_STREAM_WS}`);

      socketRef.current.onopen = () => {
        console.log("WebSocket connection opened.");
      };

      socketRef.current.onclose = (event) => {
        console.log("WebSocket connection closed.", event);
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socketRef.current.onmessage = (event) => {
        if (event.data instanceof Blob) {
          const blobURL = URL.createObjectURL(event.data);
          const image = new Image();

          image.onload = () => {
            if (ctx) {
              // Clear the canvas
              ctx.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
              // Draw the image on the canvas
              ctx.drawImage(image, 0, 0, image.width, image.height);
            }
          };

          image.src = blobURL;
        }
      };
    };

    switchDevices();

    return () => {
      console.log("Component unmounted. Closing WebSocket connection.");
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
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

export default LiveVideo;
