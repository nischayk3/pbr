/**
 * @author Bhanu Thareja <bhanu.thareja@mareana.com>
 * @Mareana - Release 3.5
 * @version  1
 * @Last Modified - 04 May, 2022
 * @Last Changed By - Bhanu Thareja
 */


import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper/index'
import GoBackSubHeader from '../../../../components/GoBackSubHeader/GoBackSubHeader'
import EditableTable from '../../../../components/EditableTable/EditableTable'

import { getRoleConfiguartions, saveRoleConfiguartions, deleteRoleConfiguartions } from '../../../../services/userRolesAndAccessService'

const RolesAndAccess = () => {

	return (
		<>
			<BreadCrumbWrapper />
			<div className='custom-user-roles-wrapper'>
				<GoBackSubHeader currentPage="Roles" />
				<EditableTable
					getTableData={getRoleConfiguartions}
					saveTableData={saveRoleConfiguartions}
					deleteTableRow={deleteRoleConfiguartions}
					screens = {"Roles"}
				/>
			</div>
		</>
	)
}

export default RolesAndAccess