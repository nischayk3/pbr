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

import { getRoleConfiguartions, saveRoleConfiguartions, deleteRoleConfiguartions } from '../../../services/userRolesAndAccessService'

const RolesAndAccess = () => {
    const dispatch = useDispatch()
    const [tableData, setTableData] = useState(null)

    useEffect(() => {
        loadRoleConfiguartions()
    }, [])

    const loadRoleConfiguartions = async () => {
        dispatch(showLoader())
        try {
            const response = await getRoleConfiguartions()
            const { message } = response.data
            setTableData(message)
            dispatch(hideLoader())
        } catch (err) {
            console.log('err: ', err)
            dispatch(hideLoader())
        }
    }

    const onSaveRolesAndAccess = async tableData => {
        tableData.forEach(obj => delete obj.key)
        console.log(tableData)
        // dispatch(showLoader())
        // try {
        //     await saveRoleConfiguartions(tableData)
        //     dispatch(hideLoader())
        // } catch (err) {
        //     console.log('err: ', err)
        //     dispatch(hideLoader())
        // }
    }

    if (!tableData) {
        return null
    }

    return (
        <>
            <BreadCrumbWrapper />
            <div className='custom-user-roles-wrapper'>
                <GoBackSubHeader currentPage="Roles" />
                <EditableTable
                    tableData={tableData}
                    onSaveTable={onSaveRolesAndAccess}
                    onDeleteTableRow={deleteRoleConfiguartions}
                />
            </div>
        </>
    )
}

export default RolesAndAccess