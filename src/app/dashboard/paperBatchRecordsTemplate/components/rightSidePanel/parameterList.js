import React, { useState, useEffect } from 'react'
import {
    Collapse,
    Form,
    Divider
} from 'antd';
import {
    CaretDownOutlined,
} from '@ant-design/icons';
import InputField from '../../../../../components/InputField/InputField';
const { Panel } = Collapse;
 /* istanbul ignore next */
function ParameterList(props) {
    let { originalResponse,setAreasMap,areasMap } = props
    const [parameterList, setParameterList] = useState([])
    const [tableList, setTableList] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const [showDetailsIndex, setShowDetailsIndex] = useState("")

    useEffect(() => {
        if (originalResponse) {
            let arr = originalResponse?.Data?.filter(el=>el.type=="CONFIGURED_PARAMETER")
            let arr1 = originalResponse?.Data?.filter(el=>el.type=="CONFIGURED_TABLE")
            setParameterList(arr)
            setTableList(arr1)
        }
    }, [originalResponse])

    const handleView = (index,key,value) => {
        setShowDetails(true)
        setShowDetailsIndex(index)
        let updateObj = { ...areasMap }
        updateObj.areas.forEach(item => {
            if (item.areaValue === key) {
                item.strokeColor = "red",
                    item['lineWidth'] = 3
            } else if(item.areaValue === value) {
                item.strokeColor = "green"
                item['lineWidth'] = 3
            }else{
                item.strokeColor = "blue"
                item['lineWidth'] = 1
            }
        })
        setAreasMap(updateObj)
    }
    
    return (
        <div>
            <h3 style={{ padding: 10, marginBottom: 0 }}>SUMMARY PANEL</h3>

            <Collapse
                accordion
                expandIconPosition='right'
                defaultActiveKey={['1']}>
                <Panel header='Parameters' key='1'>
                    <div className='snippetsBlock'>
                        {parameterList?.map((item,index) => (
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    {`Parameter ${index + 1}`}
                                    <a onClick={()=>handleView(index,item.key_text,item.value_text)}>view details</a>
                                </div>
                                {showDetails && showDetailsIndex == index  && <div style={{marginTop : 10}}>
                                    <p style={{color:"#908888"}}>Key <span style={{marginLeft:45,color:"black"}}>{item.key_text}</span></p> 
                                    <p style={{color:"#908888"}}>Value <span style={{marginLeft:33,color:"black"}}>{item.value_text}</span></p> 
                                    <p style={{color:"#908888"}}>Method <span style={{marginLeft:20,color:"black"}}>{item.method}</span></p> 
                                </div>}

                                <Divider style={{margin:14}}/>
                            </div>))}
                    </div>
                </Panel>
                <Panel header='Tables' key='2'>
                    <div className='snippetsBlock'>
                        {tableList?.map((item,index) => (
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    {`Parameter ${index + 1}`}
                                    <a onClick={()=>handleView(index,item.key_text,item.value_text)}>view details</a>
                                </div>
                                {showDetails && showDetailsIndex == index  && <div style={{marginTop : 10}}>
                                    <p style={{color:"#908888"}}>Name <span style={{marginLeft:45,color:"black"}}>{item.name}</span></p> 
                                </div>}

                                <Divider style={{margin:14}}/>
                            </div>))}
                    </div>
                </Panel>
            </Collapse>
        </div>
    )
}

export default ParameterList