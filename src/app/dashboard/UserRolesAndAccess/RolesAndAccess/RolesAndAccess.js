/**
 * @author Bhanu Thareja <bhanu.thareja@mareana.com>
 * @Mareana - Release 3.5
 * @version  1
 * @Last Modified - 04 May, 2022
 * @Last Changed By - Bhanu Thareja
 */

import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper/index';
//import EditableTable from '../../../../components/EditableTable/EditableTable'
import Roles from './Roles';
import "./style.scss";

const RolesAndAccess = () => {

	return (
		// <>
		// 	<BreadCrumbWrapper />
		// 	<div className='custom-user-roles-wrapper'>
		// 		<GoBackSubHeader currentPage="Roles" />
		//  <EditableTable
		// 			getTableData={getRoleConfiguartions}
		// 			saveTableData={saveRoleConfiguartions}
		// 			deleteTableRow={deleteRoleConfiguartions}
		// 			screens = {"Roles"}
		// 		/>
		// 	</div>
		// </>
		<div className='custom-wrapper'>
			<BreadCrumbWrapper />
			<div className='custom-content-layout'>
				<Roles />
			</div>
		</div>

	)
}

export default RolesAndAccess