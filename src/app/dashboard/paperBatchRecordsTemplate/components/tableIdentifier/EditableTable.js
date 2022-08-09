import { useState } from "react";
import * as React from "react";
import { Form, Table, Select } from "antd";
import './styles.scss';

const coloptions = [{lable:"Random1",value:"random1"},{lable:"Random2",value:"random2"},{lable:"Rando3",value:"random3"}]
const rowoptions = [{lable:"rowRandom1",value:"rowRandom1"},{lable:"rowRandom2",value:"rowRandom2"},{lable:"rowRandom3",value:"rowRandom3"}]

/* istanbul ignore next */
export const EditableUsersTable = props => {
    const { users, add, remove } = props;
    const [editingIndex, setEditingIndex] = useState(0);
    const columns = [
        {
            title: "Id",
            dataIndex: "columnindex",
            key: "columnindex",
            align:"center",
            width: "9%"
        },
        {
            title: "Value",
            dataIndex: "cell_text",
            key: "cell_text",
            width: "25%"
        },
        {
            title: "Combine With",
            dataIndex: "anchor_key",
            key: "anchor_key",
            render: (value, row, index) => {
                return (
                    <Form.Item name={[index, "combine_with"]}>
                        <Select
                            placeholder="Select"
                            style={{ width: "80%", marginRight: 8 }}
                            options={coloptions}
                        />
                    </Form.Item>
                );
            }
        },
        {
            title: "Applicable TO",
            dataIndex: "anchor_key",
            key: "anchor_key",
            render: (value, row, index) => {
                return (
                    <Form.Item name={[index, "applicalbe_to"]}>
                        <Select
                            placeholder="Select"
                            style={{ width: "80%", marginRight: 8 }}
                            options={rowoptions}
                        />
                    </Form.Item>
                );
            }
        },
    ]
    return (
        <div style={{height:200,overflowY:"scroll",border:""}}>
            <Table
                className='tableIdentifier'
                columns={columns}
                dataSource={users}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '50', '100'] }}
            />
        </div>

    );
};
