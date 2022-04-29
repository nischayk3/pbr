import React from 'react';

import BreadCrumbWrapper from '../../../components/BreadCrumbWrapper/index'
import GoBackSubHeader from '../../../components/GoBackSubHeader/GoBackSubHeader';
import EditableTable from '../../../components/EditableTable/EditableTable'
import tableData from './UserConfiguration.json'
import classes from '../UserRolesAndAccess.module.scss'

class UserConfiguration extends React.Component {

  onSaveUserConfiguration = data => {
    console.log(data)
  }

  render() {
    return (
      <div className={classes['user-roles-and-access']}>
        <BreadCrumbWrapper />
        <GoBackSubHeader currentPage="User configuration" />
        <div style={{ position: 'relative' }}>
          <EditableTable
            tableData={tableData}
            onSaveTable={this.onSaveUserConfiguration}
          />
        </div>
      </div>
    );
  }
}

export default UserConfiguration