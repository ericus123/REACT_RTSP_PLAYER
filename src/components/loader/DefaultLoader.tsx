import { CSSProperties, FC } from "react";

type Props = {
  style?: CSSProperties;
  className?: string;
};
const DefaultLoader: FC<Props> = ({ style, className }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      Loading...
    </div>
  );
};

export default DefaultLoader;
