import { Empty, Select, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const DerivedParameterDetails = props => {
    const { parameters } = props

    return !parameters || !parameters.length ? <Empty 
                                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                    description={<span>Select a parameter from the views</span>}
                                                /> : <>

        <>
            <p className='cstm-txt'>Details - 
                <span className="cstm-bordered-txt">Temprature combined</span>
            </p>
            
            <p className='cstm-lable'>Type</p>

            <Select defaultValue="jack" style={{ width: 120 }}>
                <Option value="jack">A</Option>
                <Option value="lucy">B</Option>
                <Option value="Yiminghe">C</Option>
            </Select>

            <Button type="dashed" icon={<PlusOutlined />}>Add Transformation</Button>

            <ul className="transformation-parameters-ul">
                {parameters.map((parameter, i) => {
                    return (
                        <li key={i}><label>{parameter.label}</label> <span>{parameter.value}</span></li>
                    )
                })}
            </ul>
        </>

    </>

}

export default DerivedParameterDetails