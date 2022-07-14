import React from "react";
import ErrorScreen from "../../components/ErrorScreen";
import TokenExpiredImg from "../../assets/images/TokenExpired.svg";

const TokenExpired = () => {
  const handleOnLogin = () => {
    const tokenExpiredEvent = new Event("tokenExpired");
    document.dispatchEvent(tokenExpiredEvent);
    window.location.reload();
    window.location.href = "/";
  };
  return (
    <div>
      <ErrorScreen
        img={TokenExpiredImg}
        title="Oops, we lost you!"
        content="Your signature seems to have expired. Please log back in."
        buttonText="Log in"
        handleClick={handleOnLogin}
      />
    </div>
  );
};
export default TokenExpired;
