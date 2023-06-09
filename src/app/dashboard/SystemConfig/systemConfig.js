import React from 'react';
import Banner from "../../../assets/images/MoleculeBanner.svg";
import BreadCrumbWrapper from '../../../components/BreadCrumbWrapper';
import ScreenHeader from '../../../components/ScreenHeader/screenHeader';
import ConfigTable from './components/configTable';
import "./style.scss";

const SystemConfig = () => {
	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className="custom-content-layout">
				<ScreenHeader
					bannerbg={{
						background:
							"linear-gradient(180deg, rgba(202, 253, 190, 0.65) 0%, #FCF6BE 100%)",
					}}
					title={`Howdy ${localStorage.getItem("username")}`}
					description="Ready to add new customers and define their controls? Let’s go!"
					source={Banner}
					sourceClass="geanealogy-image"
				/>
				<ConfigTable />
			</div>
		</div>
	)
}

export default SystemConfig