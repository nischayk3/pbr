import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProctectedRoute = ({ authorised, errorStatus, component: Component, ...rest }) => {
	console.log("authorised", authorised,);
	console.log(" errorStatus", errorStatus);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!authorised) {
					return (
						<Redirect
							to={{
								pathname: `/tokenexpired`,
							}}
						/>
					);

				} else if (errorStatus) {
					return (
						<Redirect
							to={{
								pathname: `/error`,
							}}
						/>
					);
				} else {
					return <Component {...props} />;
				}
			}}
		/>
	);
};

export default ProctectedRoute;
