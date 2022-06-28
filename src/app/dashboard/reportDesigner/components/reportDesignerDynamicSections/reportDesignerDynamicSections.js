import React, { useEffect, useState } from 'react';
import { Form, Input, Space, Popconfirm, Card, Tooltip } from 'antd';
import { DeleteTwoTone, PlusOutlined, EditOutlined } from '@ant-design/icons';
import './styles.scss';
import ReportDesignerDynamicRow from './reportDesignerDynamicRow/reportDesignerDynamicRow';
import Chart from '../reportChart/chartComponent/chartComponent'
import { showLoader, hideLoader, showNotification } from '../../../../../duck/actions/commonActions';
import { useDispatch } from 'react-redux';
import checkIcon from '../../../../../assets/images/checkbox.svg'
import { loadedLayout } from '../../../../../duck/actions/reportDesignerAction';

function ReportDesignerDynamicSections(props) {
    useEffect(() => {
        LoadData()
        if (props.show) {
            setEditable(true)
        }
    })

    const dispatch = useDispatch();
    const [addedCharts, setAddedCharts] = useState(props.chart_layout ? props.chart_layout : {})
    const [addedKeys, setAddedKeys] = useState({})
    const [showChart, setShowChart] = useState({})
    const [showAddSection, setShowAddSection] = useState(false)
    const [editable, setEditable] = useState(false)

    const { list, setCurrentSection, currentSection } = props;

    const deleteChart = (chartName, section) => {
        dispatch(showLoader())
        section = section + 1
        let charts_all = { ...addedCharts }
        let chart_index = charts_all[`${section}`].indexOf(chartName)
        if (chart_index > -1) {
            charts_all[`${section}`].splice(chart_index, 1)
            dispatch(loadedLayout(true)) // 2nd parameter means remove one item only
        }
        setAddedCharts(charts_all)
        dispatch(hideLoader())
    }

    const handleEdit = (value) => {
        setEditable(!value)
    }
    const extract = (str) => {
        let s = str.length - 1
        let chart_name = ''
        function reverse(ss) {
            var o = '';
            for (var i = ss.length - 1; i >= 0; i--)
                o += ss[i];
            return o;
        }
        let b = false
        for (let i = s - 1; i >= 0; i--) {
            if (str[i] == '>') {
                // b = false
                return reverse(chart_name)
            }
            if (b) {
                chart_name = chart_name + str[i]
            }
            if (str[i] == '<')
                b = true
        }
    }

    const chartAddCheck = (chartName, section) => {
        section = section + 1
        if (`${section}` in addedCharts)
            if (addedCharts[`${section}`] != null)
                if (addedCharts[`${section}`].includes(chartName)) {
                    return true
                }
                else
                    return false
            else
                return false
        else
            return false
    }

    const addChart = (chartName, section) => {
        if (!props.show) {
            setCurrentSection(section)
            extract(chartName)
            if (chartName && chartName[0] == '<') {
                chartName = extract(chartName)
            }
            dispatch(showLoader())
            section = section + 1
            if (`${section}` in addedCharts) {

                if (addedCharts[`${section}`].includes(chartName)) {
                    dispatch(showNotification('error', 'Chart already added'))
                    dispatch(hideLoader())
                }
                else {
                    addedCharts[`${section}`].push(chartName)
                    setAddedCharts(addedCharts)
                    dispatch(hideLoader())

                }
            }
            else {

                if (addedCharts && !addedCharts[`${section}`]) {
                    addedCharts[`${section}`] = []
                    addedCharts[`${section}`].push(chartName)
                    props.setSectionCharts(chartName, addedCharts)
                    setAddedCharts(addedCharts)
                    dispatch(hideLoader())
                }
                else {

                    addedCharts[`${section}`].push(chartName)
                    setAddedCharts(addedCharts)
                }
                dispatch(hideLoader())
            }

            props.setSectionCharts(chartName, addedCharts)
        }

    }

    const deleteSection = (sectionNum) => {
        if (sectionNum == 0)
            setShowAddSection(false)

        dispatch(showLoader())
        let section = { ...addedCharts }
        section[sectionNum + 1] = []
        function deleteAndShift(object, key) {
            delete object[key];
            while (++key in object) {
                object[key - 1] = object[key];
                delete object[key];
            }
        }
        deleteAndShift(section, sectionNum + 1)
        props.deleteSection(section)
        setAddedCharts(section)
        dispatch(hideLoader())

    }

    const sectionAddKey = (section) => {

        dispatch(showLoader())
        section = section - 1
        addedKeys[`${section}`] = true
        setAddedKeys(addedKeys)
        dispatch(hideLoader())
        props.setSectionAddKey(addedKeys)
    }

    const trackCharts = (section) => {
        dispatch(showLoader())
        showChart[`${section}`] = true
        setShowChart(showChart)
        dispatch(hideLoader())
        props.setSectionAddCharts(showChart)
    }

    const LoadData = () => {
        setAddedCharts(props.charts_layout)
        setShowChart(props.sectionAddedCharts)
        setAddedKeys(props.sectionKeys)
    }

    console.log(showAddSection)
    return (
        <div className="reportDesigner-dynamicSections bg-white">
            <Card className="reportTableCard" title="Report Table" >
                <div className="designer-block">
                    <Form.List name={["response"]}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div style={{ border: currentSection == name ? "1px solid #486BC9" : "1px solid #E3E3E3", marginBottom: "30px", minHeight: "160px", borderRadius: "4px", marginTop: '20px' }}>

                                        {name >= 0 ? setShowAddSection(true) : setShowAddSection(false)}
                                        <p className="section-name">Section {name + 1} </p>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '10px' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                                <Form.Item {...restField} name={[name, 'sectionName']}>
                                                    <Input placeholder="Section" style={{ width: '150px', marginBottom: '10px', marginLeft: '35px', marginRight: '20px' }} className="input-section" disabled={props.show} disabled={editable} />
                                                </Form.Item>
                                                <Tooltip disabled={props.show} placement="topLeft" title="Edit Section Name">    <EditOutlined style={{ marginTop: '7px', marginLeft: '0px', color: '#949494', fontSize: '16px' }} onClick={() => handleEdit(editable)} /> </Tooltip>
                                            </div>
                                            {name > 0 ?
                                                <div className="add-chart" onClick={() => trackCharts(name)} ><span style={{ marginRight: '4px' }}><PlusOutlined style={{ fontSize: '14px' }} /></span>  Add chart  </div> : <></>
                                            }
                                            {name > 0 ?
                                                <div style={{ marginLeft: '15%' }}>
                                                    <Popconfirm title="Are you Sure you want to delete the section?" onConfirm={() => { remove(name); deleteSection(name) }} disabled={props.show}>
                                                        <DeleteTwoTone twoToneColor="red" style={{ fontSize: '18px', marginTop: '5px' }} />
                                                    </Popconfirm>
                                                </div>
                                                :
                                                <div style={{ marginLeft: '194%' }}>
                                                    <Popconfirm title="Are you Sure you want to delete the section?" onConfirm={() => { remove(name); deleteSection(name) }} disabled={props.show}>
                                                        <DeleteTwoTone twoToneColor="red" style={{ fontSize: '18px', marginTop: '5px' }} />
                                                    </Popconfirm>
                                                </div>
                                            }

                                        </div>
                                        {!addedKeys[name] ?
                                            <center>
                                                <div className="sectionTable">
                                                    <div
                                                        className='create-new-report'
                                                        onClick={() => sectionAddKey(name + 1)}                                                     >
                                                        <PlusOutlined />
                                                        <p>Add key and value</p>
                                                    </div>
                                                </div>
                                            </center> :
                                            <></>
                                        }
                                        {addedKeys[name] ?
                                            <>
                                                <Space
                                                    className="dynamicSections-spaceSection"
                                                    key={key}
                                                    style={{ display: 'flex', justifyContent: 'center' }}
                                                    align="baseline"
                                                >
                                                    <table className="dynamicSections-table" style={{ width: '1185px', marginLeft: '18px', }}>
                                                        <thead className="dynamicSections-thead">
                                                            <tr>
                                                                <th className="action-clm">Action</th>
                                                                <th className="key-clm">Key</th>
                                                                <th className="value-clm">Value</th>
                                                                <th className="edit-clm">Editable?</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="dynamicSections-tbody">
                                                            <ReportDesignerDynamicRow fieldKey={name} show={props.show} setCurrentSection={setCurrentSection} />
                                                        </tbody>
                                                    </table>
                                                </Space>
                                            </> : <></>
                                        }
                                        <div >
                                            <div className="chart-block">
                                                {name > 0 && showChart[name] ?
                                                    list.map((i) =>
                                                    (<Form.Item {...restField} name={[name, 'select']}>
                                                        <div className={chartAddCheck(i, name) ? "chart-tiless" : "chart-tilesss"} onClick={(e) => addChart(e.target.innerHTML, name)}>
                                                            {addedCharts[`${name + 1}`] && addedCharts[`${name + 1}`].map((j) => (j == i ? <div className="chart-tile"> <img src={checkIcon} /></div> : <></>))}
                                                            <p className="charttile-content">{i}</p>
                                                        </div>
                                                    </Form.Item>
                                                    )
                                                    ) : <></>
                                                }
                                            </div>
                                        </div>
                                        {props.charts_layout[`${name + 1}`] && props.charts_layout[`${name + 1}`].map((i) =>
                                        (
                                            <div className="chart-sections" >
                                                <p className="chart-name" >{i} <Popconfirm title="Are you sure you want to delete the chart?" onConfirm={() => deleteChart(i, name)} disabled={props.show}>
                                                    <Tooltip placement="bottomRight" title="Delete the chart">    <DeleteTwoTone twoToneColor="red" style={{ marginLeft: '20px' }} /> </Tooltip>
                                                </Popconfirm></p>
                                                <Chart chartName={i} />
                                            </div>
                                        ))}
                                        <Tooltip placement="bottomRight" title="Add Section"> <PlusOutlined style={{ fontSize: '18px', marginLeft: '99.2%', color: '#093185', background: "white", padding: "2px", borderRadius: "50px", position: 'relative', top: '10px', filter: 'drop-shadow(0px 1px 10px rgba(38, 38, 38, 0.1))' }} twoToneColor="#eb2f96" onClick={() => add()} /> </Tooltip>

                                    </div>
                                ))}
                                <Form.Item>
                                    {showAddSection ? <></> :
                                        <p disabled={props.show}>
                                            <center>
                                                <div
                                                    className='create-new-report'
                                                    onClick={() => add()}                                    >
                                                    <PlusOutlined />
                                                    <p>Add section</p>
                                                </div>
                                            </center>
                                        </p>
                                    }
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </div>
            </Card>
        </div>
    );
}

export default ReportDesignerDynamicSections;
