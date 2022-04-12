import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Input, Select, Switch, DatePicker } from 'antd';
import ChartTable from '../landingPage/chartTableLoad';
import SelectField from '../../../../../components/SelectField/SelectField';
import InputField from '../../../../../components/InputField/InputField';
import './styles.scss';

export default function chartFilter(props) {
    const { Search } = Input;
    const [chartSearch, setChartSearch] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        document.addEventListener('mousedown', closeTableView);
    }, [])
    const focus = () => {
        setChartSearch(true);
    }
    const onFocusRemove = (value) => {
        setChartSearch(value);
    }
    const closeTableView = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setChartSearch(false);

        }
    }



    return (
        <div style={{ padding: '12px 18px' }}>
            <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={8}>
                    <SelectField
                        label='Type Of charts'
                        placeholder='Select Charts'
                        onChangeSelect={props.onTypeChartsChange}
                        selectList={props.typeOfChartsOptions} />
                </Col>
                <Col className="gutter-row" span={16} ref={ref}>
                    <p className='import-chart'>Import Chart</p>
                    <Search placeholder="Search" 
                    onFocus={focus} 
                    //value={props.viewData.searchValue}
                    onChange={props.onSearchChange}
                    onSearch={props.searchTable} />
                    {chartSearch && <ChartTable style={{ position: 'absolute', zIndex: 999 }} 
                    searchData={props.searchData} 
                    searchTableData={props.searchTableData} 
                    setViewData={props.setViewData} 
                    viewData={props.viewData} 
                    setChartSearch={onFocusRemove} 
                    searchData={props.searchData}/>}
                </Col>
            </Row>
            <Row gutter={[16, 24]} style={{ marginTop: '20px' }}>
                <Col className="gutter-row" span={8}>
                    <div className='show-data'>
                        <p style={{ color: '#777777' }}>Show Unapproved data</p>
                        <Switch type='primary' size='small' onChange={() => props.checkboxChange()} />

                    </div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <SelectField
                        placeholder='Site'
                        onChangeSelect={props.onTypeChartsChange}
                        selectList={props.siteOption} />

                </Col>
                <Col className="gutter-row" span={5}>
                    <DatePicker
                        onChange={props.onChangeStart}
                    />
                </Col>
                <Col className="gutter-row" span={5}>
                    <DatePicker onChange={props.onChangeEnd} />
                </Col>
            </Row>

        </div>
    )
}
