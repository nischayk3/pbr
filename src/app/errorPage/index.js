import React from "react";
import InternalServerError from "../../assets/images/internal_server-error.png";
import ErrorScreen from "../../components/ErrorScreen";

const ErrorPage = () => {
	const handleOnLogin = () => {
		window.location.reload();
		window.location.href = "/";
	};
	return (
		<div>
			<ErrorScreen
				img={InternalServerError}
				title="Uh oh!"
				content="Looks like the server encountered an unexpected condition.
				Please login again and try after some time."
				buttonText="Log in"
				handleClick={handleOnLogin}
			/>
		</div>
	);
};
export default ErrorPage;
