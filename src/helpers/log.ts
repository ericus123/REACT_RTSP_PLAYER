type LogInfo = {
  message: string;
  type: "warning" | "error" | "message";
  enabled?: boolean;
};

export const log = ({
  message,
  type = "message",
  enabled = false,
}: LogInfo): void => {
  if (enabled) {
    switch (type) {
      case "warning":
        console.warn(`Warning: ${message}`);
        break;
      case "error":
        console.error(`Error: ${message}`);
        break;
      case "message":
        console.log(`Message: ${message}`);
        break;
      default:
        console.log(message);
    }
  }
};
