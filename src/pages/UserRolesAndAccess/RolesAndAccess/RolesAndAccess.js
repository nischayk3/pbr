import React from 'react';

import BreadCrumbWrapper from '../../../components/BreadCrumbWrapper/index'
import GoBackSubHeader from '../../../components/GoBackSubHeader/GoBackSubHeader';
import EditableTable from '../../../components/EditableTable/EditableTable'
import tableData from './RolesAndAccess.json'

class RolesAndAccess extends React.Component {
    
    onSaveRolesAndAccess = () => {
        console.log(this.state)
    }

    render() {
        return (
            <div className='custom-wrapper'>
                <BreadCrumbWrapper />
                <GoBackSubHeader currentPage="Roles" />
                <div style={{ position: 'relative' }}>
                     <EditableTable 
                        tableData={tableData}
                        onSaveTable={this.onSaveRolesAndAccess}
                    />
                </div>
            </div>
        );
    }
}

export default RolesAndAccess