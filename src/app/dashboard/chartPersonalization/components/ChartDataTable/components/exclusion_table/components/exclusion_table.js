import React, { Component } from 'react';
import { Table,} from 'antd';
import 'antd/dist/antd.css';
import './exclusion.scss';

class ExclusionTable extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
                <Table
                    size="small"
                    className="exclusion_table"
                    columns={[]}
                    dataSource={[]}
                    bordered
                    pagination={false}
                />
            </div>
        )
    }
}

export default ExclusionTable;