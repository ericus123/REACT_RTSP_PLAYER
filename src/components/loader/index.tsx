import React, { FC } from "react";
import { PlayerStyles } from "../../types";
import DefaultLoader from "./DefaultLoader";

const PlayerLoader: FC<PlayerStyles> = ({ className, style, customLoader }) => {
  return (
    <React.Fragment>
      {customLoader ? (
        customLoader
      ) : (
        <DefaultLoader {...{ style, className }} />
      )}
    </React.Fragment>
  );
};

export default PlayerLoader;
