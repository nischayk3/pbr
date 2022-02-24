import React from 'react';
import {
    Input,
    Typography
} from 'antd';
import './style.scss';

const { Text } = Typography

function ReportDesignerForm(props) {

    return (
        <div className="reportDesigner-grid bg-white" >
            <div className="reportDesigner-block-left bg-white" >
                <Text className="filter-text" >Report ID</Text>
                <Text className="filter-text" >Report Name</Text>
                <Text className="filter-text">View</Text>
                <Text className="filter-text">Status</Text>
                <Input className="filter-button" disabled={true} />
                <Input className="filter-button" disabled={true} />
                <Input className="filter-button" disabled={true} />
                <Input className="filter-button" disabled={true} />
            </div>
        </div>
    );
}

export default ReportDesignerForm;
