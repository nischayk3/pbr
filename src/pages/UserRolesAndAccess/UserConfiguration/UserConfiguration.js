/**
 * @author Bhanu Thareja <bhanu.thareja@mareana.com>
 * @Mareana - Release 3.5
 * @version  1
 * @Last Modified - 04 May, 2022
 * @Last Changed By - Bhanu Thareja
 */

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import BreadCrumbWrapper from '../../../components/BreadCrumbWrapper/index'
import GoBackSubHeader from '../../../components/GoBackSubHeader/GoBackSubHeader'
import EditableTable from '../../../components/EditableTable/EditableTable'
import { showLoader, hideLoader } from '../../../duck/actions/commonActions'

import { getUserConfiguartions, saveUserConfigurationws, deleteUserConfiguartions } from '../../../services/userRolesAndAccessService'

const UserConfiguration = () => {
  const dispatch = useDispatch()
  const [tableData, setTableData] = useState(null)

  useEffect(() => {
    loadUserConfiguartions()
  }, [])

  const loadUserConfiguartions = async () => {
    dispatch(showLoader())
    try {
      const response = await getUserConfiguartions()
      const { data } = response.data
      setTableData(data)
      dispatch(hideLoader())
    } catch (err) {
      console.log('err: ', err)
      dispatch(hideLoader())
    }
  }

  const onSaveUserConfigurations = async tableData => {
    tableData.forEach(obj => delete obj.key)
    dispatch(showLoader())
    try {
      await saveUserConfigurationws(tableData)
      dispatch(hideLoader())
    } catch (err) {
      console.log('err: ', err)
      dispatch(hideLoader())
    }
  }

  if (!tableData) {
    return null
  }

  return (
    <>
      <BreadCrumbWrapper />
      <div className="custom-user-roles-wrapper">
        <GoBackSubHeader currentPage="User configuration" />
        <EditableTable 
          tableData={tableData} 
          onSaveTable={onSaveUserConfigurations}
          onDeleteTableRow={deleteUserConfiguartions}
        />
      </div>
    </>
  )
}

export default UserConfiguration