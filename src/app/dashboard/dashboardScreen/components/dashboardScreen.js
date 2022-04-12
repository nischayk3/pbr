import React, { useEffect, useState, useRef } from 'react';
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader, showNotification } from '../../../../duck/actions/commonActions';
import { getChartList } from '../../../../services/chartPersonalizationService';
import { getChartPlotData } from '../../../../services/workSpaceServices';
import { Button } from 'antd';
import LandingPage from './landingPage/landingPage';
import ChartPage from './viewChart/viewChart';
import { ShareAltOutlined } from '@ant-design/icons';
import './styles.scss';

const DashboardScreen = () => {
    const dispatch = useDispatch();
    //to show landing page
    const [showChartCard, setShowChartCard] = useState(false);
    //to create the dashboard name
    const [dashboardName, setdashboardName] = useState('');
    //serach table data
    const [searchTableData, setSearchTableData] = useState([]);
    const [viewData, setViewData] = useState({ chartName: '', status: '', chartDispId: '', searchValue: '', chartVersion: 0 });
    const searchData = useRef([]);
    const [landingChartData, setLandingChartData] = useState([]);
    const [landingChartLayout, setLandingChartLayout] = useState([]);
    const [landingChartLayoutX, setLandingChartLayoutX] = useState([]);
    const [landingChartLayoutY, setLandingChartLayoutY] = useState([]);

    //for creating new dashboard name
    const settingDashboardName = (value) => {
        setdashboardName(value);
    }
    const onBackArrowClick = () => {
        //setShowDashboard(false);
    }

    const chartCard = (value) => {
        setShowChartCard(value)
    }

    useEffect(() => {
        getTableData();

    }, [])

    useEffect(() => {
        console.log(viewData)
        if (viewData.chartDispId != '') {
            getChartData();
        }

    }, [viewData.chartDispId])

    //get table data
    const getTableData = async () => {
        let req = { chart_status: 'ALL' };
        let antdDataTable = [];

        try {
            dispatch(showLoader());
            const viewRes = await getChartList(req);
            viewRes.data.forEach((item, key) => {
                let antdObj = {};
                antdObj['key'] = key;
                antdObj['created_by'] = item.created_by;
                antdObj['chart_disp_id'] = item.chart_disp_id;
                antdObj['chart_name'] = item.chart_name;
                antdObj['chart_status'] = item.chart_status;
                antdObj['chart_version'] = item.chart_version;
                antdObj['chart_info'] = item.chart_info;
                antdDataTable.push(antdObj);
            });
            searchData.current = JSON.parse(JSON.stringify(antdDataTable));
            setSearchTableData(antdDataTable);
            dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
            dispatch(showNotification('error', error.message));
        }
    };

    //function to handle search
    const searchTable = (value) => {
        const filterData = searchData.current.filter((o) =>
            Object.keys(o).some((k) =>
                String(o[k]).toLowerCase().includes(viewData.searchValue.toLowerCase())
            )
        );
        setSearchTableData(filterData)
    };

    //on search value changes
    const onSearchChange = (e) => {
        if (e.target.value === '') {
            setSearchTableData(searchData.current);
        }
        setViewData({ ...viewData, searchValue: e.target.value });
    }

    //get chart data to plot 
    const getChartData = async () => {
        console.log(viewData);
        let login_response = JSON.parse(localStorage.getItem('login_details'));
        let req = { chartId: viewData.chartDispId }
        let headers = {
            'content-type': 'application/json',
            'x-access-token': login_response.token ? login_response.token : '',
            'resource-name': 'DASHBOARD',
        };
        try {
            dispatch(showLoader());
            const chartResponse = await getChartPlotData(req, headers);
            setLandingChartData(chartResponse.data[0].data);
            setLandingChartLayout(chartResponse.data[0].layout)
            setLandingChartLayoutX(chartResponse.data[0].layout.xaxis)
            setLandingChartLayoutY(chartResponse.data[0].layout.yaxis)
            dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
            dispatch(showNotification('error', error.Message));
        }
    }

    const layout = {
        xaxis: landingChartLayoutX,
        yaxis: landingChartLayoutY,
        autosize: false,
        width: 150,
        height: 50,
    };

    const chartLayout={
        xaxis: landingChartLayoutX,
        yaxis: landingChartLayoutY,
        autosize: false,
        width: 580,
        height: 250,
        margin: {
            l: 60,
            r: 50,
            //b: 75,
            t: 10,
            pad: 4
        }
    }

    return (
        <div className='custom-wrapper'>
            {/* <BreadCrumbWrapper /> */}
            <div className='sub-header'>
                <BreadCrumbWrapper />
                {/* <div className='sub-header-title'>
                    <ArrowLeftOutlined className='header-icon' onClick={onBackArrowClick} /> &nbsp;
                    <span className='header-title'>Dashboard</span>
                </div> */}
                {showChartCard && <div className='btns'>
                    <Button>Save As</Button>
                    <Button>Save</Button>
                    <ShareAltOutlined style={{ color: '#093185', fontSize: '18px' }} />
                </div>}
            </div>
            <div className='custom-content-layout'>

                {!showChartCard &&
                    <LandingPage
                        chartCard={chartCard}
                        dashboarNameFunction={settingDashboardName}
                        dashboardName={dashboardName}
                        searchTableData={searchTableData}
                        setSearchTableData={setSearchTableData}
                        searchTable={searchTable}
                        onSearchChange={onSearchChange}
                        searchData={searchData}
                        viewData={viewData}
                        setViewData={setViewData}
                        plotData={landingChartData}
                        plotLayout={layout}


                    />}
                {showChartCard &&
                    <ChartPage
                        dashboardName={dashboardName}
                        plotData={landingChartData}
                        plotLayout={chartLayout}
                        viewData={viewData}
                        searchTableData={searchTableData}
                        setSearchTableData={setSearchTableData}
                        searchTable={searchTable}
                        onSearchChange={onSearchChange}
                        searchData={searchData}
                        setViewData={setViewData}
                    />}
            </div>
        </div>
    )
}

export default DashboardScreen