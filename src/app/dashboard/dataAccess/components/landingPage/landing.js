import React from "react";
import illustrations from "../../../../../assets/images/ChartBanner.svg";
import ScreenHeader from "../../../../../components/ScreenHeader/screenHeader";

export default function DataAccessLandingPage() {

	return (
		<div>
			<ScreenHeader
				bannerbg={{
					background:
						"linear-gradient(180deg, #E7E5FF 0%, #FFF4F4 100%)",
				}}
				title={`Howdy ${localStorage.getItem("username")},`}
				description="It’s a good day to look up some APIs!"
				source={illustrations}
				sourceClass="dashboard-landing"
			/>
		</div>
	)

}