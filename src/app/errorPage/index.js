import React from "react";
import InternalServerError from "../../assets/images/internal_server-error.png";
import ErrorScreen from "../../components/ErrorScreen";
import { useHistory } from "react-router-dom";
import { checkNetworkError } from "../../duck/actions/commonActions";
import { useDispatch } from "react-redux";

const ErrorPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleOnLogin = () => {
    dispatch(checkNetworkError(false));
    history.push("/dashboard/workspace");
  };
  return (
    <div>
      <ErrorScreen
        img={InternalServerError}
        title="Uh oh!"
        content="Looks like the server encountered an unexpected condition.
				Please login again and try after some time."
        buttonText="Home"
        handleClick={handleOnLogin}
      />
    </div>
  );
};
export default ErrorPage;
