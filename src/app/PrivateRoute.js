import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProctectedRoute = ({ authorised, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (authorised) {
					return <Component {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: `/tokenexpired`,
							}}
						/>
					);
				}
			}}
		/>
	);
};

export default ProctectedRoute;
