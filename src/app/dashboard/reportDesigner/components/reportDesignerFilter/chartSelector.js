import React, { useState } from 'react';
import {
    Card,
    Select,
    Typography,
    Form,
} from 'antd';
// import { AreaChartOutlined } from '@ant-design/icons';
// import { getCharts } from '../../../../../services/reportDesignerServices';
import './styles.scss';


const { Option } = Select;
const { Text } = Typography;


function ChartSelector(props) {

    // const [form] = Form.useForm();
    // const [data, setData] = useState({})
    
    const { setSelectedChartList, selectedChartList, chartList} = props
    const chartsList =  chartList.length > 0 ? chartList : ['No charts for selected View']


    // useEffect(() => {
    //     if(viewId)
    //     getChartsList(viewId,viewVersion)
    // }, [])

    // const handleValuesChange = (changedValues, values) => {
    //     setData(values)
    // };

    const handleChange = selectedItems => {
        setSelectedChartList(selectedItems);
    };

    // const getChartsList = (id,version) => {
    //     let req = `${id}-${version}`;
    //     getCharts(req).then((res) => {
    //         setChartList(res['data']);
    //     });
    // };

    return (
        <div>
            <Card className="chartid-main" title="Chart">
                <Text>Chart ID</Text> <br/><br/>
                <Select
                    mode="multiple"
                    placeholder="Select Multiple Charts"
                    value={selectedChartList}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                >
                    {chartsList.length > 0  ? chartsList.map(item => (
                        <Option value={item}>
                            {item}
                        </Option>
                    )):<Option >
                    
                </Option> }
                </Select>
            </Card>
        </div>
    );
}

export default ChartSelector;
