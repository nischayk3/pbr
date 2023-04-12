/**
 * @author Dinesh Kumar
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 11 April, 2023
 * @Last Changed By - Dinesh Kumar
 */

import React from 'react';
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import LandingPage from './landing/Landing';

const ViewPage = () => {
	return (
		<div className='custom-wrapper'>
			<BreadCrumbWrapper />
			<div className='custom-content-layout'>
				<LandingPage />
			</div>
		</div>
	);
};

export default ViewPage;
