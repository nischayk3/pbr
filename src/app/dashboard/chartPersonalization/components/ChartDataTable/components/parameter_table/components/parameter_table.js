import React, { Component } from 'react';
import { Table,} from 'antd';
import 'antd/dist/antd.css';
import './parameter.scss';

class ParameterTable extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
                <Table
                    size="small"
                    className="parameter_table"
                    columns={[]}
                    dataSource={[]}
                    bordered
                    pagination={false}
                />
            </div>
        )
    }
}

export default ParameterTable;