import React, { Component } from 'react';
import { Table,} from 'antd';
import 'antd/dist/antd.css';
import './violation.scss';

class ViolationTable extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
                <Table
                    size="small"
                    className="violation_table"
                    columns={[]}
                    dataSource={[]}
                    bordered
                    pagination={false}
                />
            </div>
        )
    }
}

export default ViolationTable;