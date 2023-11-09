self.onmessage = (e) => {
  if (e.data.type === "start" && e.data.wsUrl) {
    const socket = new WebSocket(e.data.wsUrl);

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
