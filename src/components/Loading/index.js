import React from "react";
import Spinner from "./Spinner";

const Loading = ({ text, show }) => {
  return <>{show ? <Spinner text={text} /> : null}</>;
};

export default Loading;
