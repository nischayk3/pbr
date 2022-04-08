import React, { useEffect, useState,useRef } from 'react';
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader, showNotification } from '../../../../duck/actions/commonActions';
import { getChartList } from '../../../../services/chartPersonalizationService';
import { getChartPlotData } from '../../../../services/workSpaceServices';
import {Button} from 'antd';
import LandingPage from './landingPage/landingPage';
import ChartPage from './viewChart/viewChart';
import {ShareAltOutlined} from '@ant-design/icons';
import './styles.scss';

const DashboardScreen = () => {
    const dispatch=useDispatch();
    //to show landing page
    const[showChartCard,setShowChartCard]=useState(false);
    //to create the dashboard name
    const[dashboardName,setdashboardName]=useState('');
    //serach table data
    const [searchTableData, setSearchTableData] = useState([]);
    const [viewData, setViewData] = useState({ chartName: '', status: '', chartDispId: ' ', searchValue: '', chartVersion: 0 });
    const searchData = useRef([]);
    const [landingChartData, setLandingChartData] = useState([]);
    const [landingChartLayout, setLandingChartLayout] = useState([]);

    //for creating new dashboard name
    const settingDashboardName=(value)=>{
        setdashboardName(value);
    }
    const onBackArrowClick = () => {
        //setShowDashboard(false);
    }

    const chartCard=(value)=>{
        setShowChartCard(value)
    }

    useEffect(()=>{
        getTableData();
     
    },[])

    useEffect(()=>{
        console.log(viewData)
        if(viewData.chartDispId!=''){
            getChartData();
        }
        
    },[viewData.chartDispId])

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
        let req = { chartId: viewData.chartDispId }
        try {
            dispatch(showLoader());
            const chartResponse = await getChartPlotData(req);
            setLandingChartData(chartResponse.data.data);
            setLandingChartLayout(chartResponse.data.layout)
            dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
            dispatch(showNotification('error', error.Message));
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
                    <ShareAltOutlined style={{color:'#093185',fontSize:'18px'}}/>
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

               
               />} 
                {showChartCard && <ChartPage dashboardName={dashboardName}/>}
            </div>
        </div>
    )
}

export default DashboardScreen