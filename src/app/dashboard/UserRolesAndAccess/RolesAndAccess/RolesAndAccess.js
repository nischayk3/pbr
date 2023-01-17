/**
 * @author Bhanu Thareja <bhanu.thareja@mareana.com>
 * @Mareana - Release 3.5
 * @version  1
 * @Last Modified - 04 May, 2022
 * @Last Changed By - Bhanu Thareja
 */

import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper/index';
import EditableTable from '../../../../components/EditableTable/EditableTable';
import { deleteRoleConfiguartions, getRoleConfiguartions, saveRoleConfiguartions } from '../../../../services/userRolesAndAccessService';
// import "./UserRolesAndAccess.scss";

const RolesAndAccess = () => {
	return (
		<>
			<BreadCrumbWrapper />
			<div className='custom-user-roles-wrapper'>
				<EditableTable
					getTableData={getRoleConfiguartions}
					saveTableData={saveRoleConfiguartions}
					deleteTableRow={deleteRoleConfiguartions}
					screens={"Roles"}
				/>
			</div>
		</>
	)
}

export default RolesAndAccess