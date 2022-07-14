import React from "react";
import ErrorScreen from "../../../components/ErrorScreen";
import UnAuthorised from "../../../assets/images/UnAuthorised.svg";
import { Redirect } from "react-router-dom";

const UnAuthorisedScreen = () => {
  const handleClick = () => {
    return (
      <Redirect
        to={{
          pathname: "/dashboard/workspace",
        }}
      />
    );
  };

  return (
    <div>
      <ErrorScreen
        img={UnAuthorised}
        title="Sorry, access denied!"
        content="Seems like you are not authorized to be here.You may try contacting
          your admin regarding this"
        buttonText="Home"
        handleClick={handleClick}
      />
    </div>
  );
};

export default UnAuthorisedScreen;
