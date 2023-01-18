/**
 * @author Bhanu Thareja <bhanu.thareja@mareana.com>
 * @Mareana - Release 3.5
 * @version  1
 * @Last Modified - 04 May, 2022
 * @Last Changed By - Bhanu Thareja
 */

import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper/index';
import Roles from './Roles';
import "./style.scss";

const RolesAndAccessV2 = () => {
	return (
		<div className='custom-wrapper'>
			<BreadCrumbWrapper />
			<div className='custom-content-layout'>
				<Roles />
			</div>
		</div>
	)
}

export default RolesAndAccessV2