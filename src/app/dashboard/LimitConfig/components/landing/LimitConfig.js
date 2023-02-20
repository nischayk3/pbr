import React from 'react';
import Banner from "../../../../../assets/images/MoleculeBanner.svg";
import BreadCrumbWrapper from '../../../../../components/BreadCrumbWrapper';
import ScreenHeader from '../../../../../components/ScreenHeader/screenHeader';
import LimitTable from '../LimitTable';

const LimitConfig = () => {
	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className="custom-content-layout">
				<ScreenHeader
					bannerbg={{
						background:
							"linear-gradient(180deg, rgba(202, 253, 190, 0.65) 0%, #FCF6BE 100%)",
					}}
					title={`Howdy ${localStorage.getItem("username")},`}
					description="Ready to configure some limits for the molecules?Let's go!"
					source={Banner}
					sourceClass="geanealogy-image"
				/>
				<LimitTable />
			</div>
		</div>
	)
}

export default LimitConfig