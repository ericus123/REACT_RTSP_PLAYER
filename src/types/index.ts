import { CSSProperties } from "react";

export type PlayerStyles = {
  show?: boolean;
  style?: CSSProperties;
  className?: string;
  customLoader?: React.ReactNode;
};

export type WsPlayerProps = {
  width?: number;
  height?: number;
  withWorker?: boolean;
  wsUrl: string;
  debug?: boolean;
  style?: CSSProperties;
  loaderProps?: PlayerStyles;
};
