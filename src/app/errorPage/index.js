import React from "react";
import TokenExpiredImg from "../../assets/images/TokenExpired.svg";
import ErrorScreen from "../../components/ErrorScreen";

const ErrorPage = () => {
	const handleOnLogin = () => {
		window.location.reload();
		window.location.href = "/";
	};
	return (
		<div>
			<ErrorScreen
				img={TokenExpiredImg}
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
