import { Component } from 'react'

import BreadCrumbWrapper from '../../../components/BreadCrumbWrapper/index'
import GoBackSubHeader from '../../../components/GoBackSubHeader/GoBackSubHeader'
import EditableTable from '../../../components/EditableTable/EditableTable'
import tableData from './UserConfiguration.json'

class UserConfiguration extends Component {

  onSaveUserConfiguration = data => {
    console.log(data)
  }

  render() {
    return (
      <>
        <BreadCrumbWrapper />
        <div className="custom-user-roles-wrapper">
          <GoBackSubHeader currentPage="User configuration" />
          <EditableTable tableData={tableData} onSaveTable={this.onSaveUserConfiguration} />
        </div>
      </>
    )
  }
}

export default UserConfiguration