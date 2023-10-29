self.onmessage = (e) => {
  if (e.data === "start") {
    const socket = new WebSocket(`${process.env.NEXT_PUBLIC_STREAM_WS}`);

    socket.onopen = () => {
      self.postMessage({ type: "open" });
    };

    socket.onclose = (event) => {
      self.postMessage({ type: "close", event });
    };

    socket.onerror = (error) => {
      self.postMessage({ type: "error", error });
    };

    socket.onmessage = (event) => {
      if (event.data instanceof Blob) {
        const blobURL = URL.createObjectURL(event.data);
        self.postMessage({ type: "image", blobURL });
      }
    };
  }
};
