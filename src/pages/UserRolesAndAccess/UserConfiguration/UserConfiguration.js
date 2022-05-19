/**
 * @author Bhanu Thareja <bhanu.thareja@mareana.com>
 * @Mareana - Release 3.5
 * @version  1
 * @Last Modified - 04 May, 2022
 * @Last Changed By - Bhanu Thareja
 */


import BreadCrumbWrapper from '../../../components/BreadCrumbWrapper/index'
import GoBackSubHeader from '../../../components/GoBackSubHeader/GoBackSubHeader'
import EditableTable from '../../../components/EditableTable/EditableTable'

import { getUserConfiguartions, saveUserConfigurationws, deleteUserConfiguartions } from '../../../services/userRolesAndAccessService'

const UserConfiguration = () => {

  return (
    <>
      <BreadCrumbWrapper />
      <div className="custom-user-roles-wrapper">
        <GoBackSubHeader currentPage="User configuration" />
        <EditableTable
          getTableData={getUserConfiguartions}
          saveTableData={saveUserConfigurationws}
          deleteTableRow={deleteUserConfiguartions}
        />
      </div>
    </>
  )
}

export default UserConfiguration