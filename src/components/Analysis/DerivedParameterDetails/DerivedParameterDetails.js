import { Empty, Select, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const DerivedParameterDetails = props => {
    const { parameters } = props

    return !parameters || !parameters.length ? <Empty 
                                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                    description={<span>Select a parameter from the views</span>}
                                                /> : <>

        <div>
            <p>Details - </p>
            <span>Temprature combined</span>
            <p>Type</p>

            <Select defaultValue="jack" style={{ width: 120 }}>
                <Option value="jack">A</Option>
                <Option value="lucy">B</Option>
                <Option value="Yiminghe">C</Option>
            </Select>

            <Button type="dashed" icon={<PlusOutlined />}>Add Transformation</Button>

            <ul className="transformation-parameters-ul">
                {parameters.map((parameter, i) => {
                    return (
                        <li key={i}>{parameter.label} {parameter.value}</li>
                    )
                })}
            </ul>
        </div>

    </>

}

export default DerivedParameterDetails