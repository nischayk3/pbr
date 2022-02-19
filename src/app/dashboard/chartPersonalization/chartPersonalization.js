import React, { useState } from 'react';
import ChartView from './components/ChartView/index';
import ChartFilter from './components/ChartFilter/index';
import ChartDataTable from './components/ChartDataTable/index';
import ChartType from './components/ChartType/index';
import ChartDetails from './components/ChartDetails';
import './ChartStyle.scss';
import Personalization from './components/Personalization/components/Personalization';
import {
    ArrowLeftOutlined,
    FileDoneOutlined,
    Loading3QuartersOutlined,
    SaveOutlined,
    ShareAltOutlined,
    PlusOutlined,
    CheckCircleTwoTone,
    InfoCircleTwoTone,
} from '@ant-design/icons';
import { Button, Modal, Input, Typography } from 'antd';
import chartObj from './get_chart.json';

const { Text } = Typography;

function ChartPersonalization() {
    const [chartDetails, setChartdetails] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isShare, setIsShare] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [isSaveAs, setIsSaveAs] = useState(false);
    const [isDiscard, setIsDiscard] = useState(false);
    const [showChart, setShowChart] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [showChartType, setShowChartType] = useState(false);
    const [showCustomization, setShowCustomization] = useState(false);
    const [loading, setLoading] = useState(false);
    const [chartObjData, setChartObjData] = useState(chartObj);

    function handleOk() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setVisible(false);
            setIsShare(false);
            setIsLoad(false);
            setIsNew(false);
            setIsSave(false);
            setIsSaveAs(false);
            setIsDiscard(false);
        }, 3000);
    }

    function handleCancel() {
        setVisible(false);
        setIsShare(false);
        setIsLoad(false);
        setIsNew(false);
        setIsSave(false);
        setIsSaveAs(false);
        setIsDiscard(false);
    }

    function handleTitleChange() {
        // const { isShare, isSave, isNew, isSaveAs, isLoad, isDiscard } = this.state
        if (isDiscard)
            return (
                <span>
                    <InfoCircleTwoTone
                        twoToneColor='orange'
                        style={{ fontSize: '20px', margin: '10px' }}
                    />{' '}
                    Discard Changes
                </span>
            );
        if (isSave) return <span>Congratulations</span>;
        if (isLoad)
            return (
                <span>
                    <InfoCircleTwoTone
                        twoToneColor='orange'
                        style={{ fontSize: '20px', margin: '10px' }}
                    />{' '}
                    Load
                </span>
            );
        if (isNew)
            return (
                <span>
                    <InfoCircleTwoTone
                        twoToneColor='orange'
                        style={{ fontSize: '20px', margin: '10px' }}
                    />{' '}
                    Unsaved Changes
                </span>
            );
        if (isShare)
            return (
                <span>
                    <ShareAltOutlined twoToneColor='Green' /> Share
                </span>
            );
    }

    function callbackViewType(param) {
        console.log('param', param);

        setShowChart(true);
        setShowChartType(true);
        setShowFilter(true);
        setShowCustomization(true);
    }

    const handleSaveAs = () => {
        const chartData = chartObj;
        chartData.data_filter.site = 'Site 1';

        console.log('chartData', chartData);
    };

    return (
        <div className='chart-wrapper'>
            <div className='viewCreation-block'>
                <h1 className='reportDesigner-headline'>
                    <ArrowLeftOutlined /> Chart Personalization
                </h1>
                <div className='viewCreation-btns'>
                    <Button
                        type='text'
                        className='viewCreation-loadBtn'
                        onClick={() => {
                            setVisible(true);
                            setIsNew(true);
                        }}
                    >
                        <PlusOutlined /> New
                    </Button>
                    <Button
                        className='viewCreation-loadBtn'
                        onClick={() => {
                            setVisible(true);
                            setIsNew(true);
                        }}
                    >
                        <Loading3QuartersOutlined /> Load
                    </Button>
                    <Button
                        className='viewCreation-saveBtn'
                        onClick={() => {
                            setVisible(true);
                            setIsNew(true);
                        }}
                    >
                        <SaveOutlined /> Save
                    </Button>
                    <Button
                        className='viewCreation-saveAsBtn'
                        onClick={handleSaveAs}
                    >
                        <FileDoneOutlined /> Save As
                    </Button>
                    <Button
                        className='viewCreation-shareBtn'
                        onClick={() => {
                            setVisible(true);
                            setIsNew(true);
                        }}
                    >
                        <ShareAltOutlined /> Share
                    </Button>
                </div>
            </div>
            <div className='chart-block'>
                <div className='chart-left-panel'>
                    <div style={{ marginBottom: '10px' }}>
                        <ChartView
                            callbackViewType={callbackViewType}
                            chartObj={chartObjData}
                        />
                    </div>
                    {showFilter && (
                        <div style={{ marginBottom: '10px' }}>
                            <ChartFilter chartObj={chartObjData} />
                        </div>
                    )}
                    {showChartType && (
                        <div>
                            <ChartType chartObj={chartObjData} />
                        </div>
                    )}
                </div>
                {showChart && (
                    <div className='chart-center-panel'>
                        <ChartDetails chartObj={chartObjData} />
                        <ChartDataTable />
                    </div>
                )}
                {showCustomization && (
                    <div className='chart-right-panel'>
                        <Personalization />
                    </div>
                )}
            </div>
            <div className='modalPopup'>
                <Modal
                    visible={visible}
                    title={handleTitleChange}
                    width={500}
                    mask={true}
                    onCancel={handleCancel}
                    centered={true}
                    footer={null}
                >
                    {isSave && (
                        <div>
                            <center>
                                <CheckCircleTwoTone
                                    className='circleIcon'
                                    twoToneColor='Green'
                                />
                                <br />
                                <p>
                                    {' '}
                                    Chart ID : 12345 <br /> Your Changes Have
                                    Been Successfully Saved
                                </p>
                            </center>

                            <div>
                                <Button className='saveOkBtn'>OK</Button>
                            </div>
                        </div>
                    )}

                    {isShare && (
                        <div>
                            <div>
                                <div className='shareButton'>
                                    <Text>Edit</Text>
                                    <Text>View</Text>
                                </div>
                            </div>
                            <div>
                                <div className='shareButton'>
                                    <Input width='30' />
                                    <Input />
                                </div>
                            </div>
                            <div>
                                <Button className='shareOkBtn'>OK</Button>
                            </div>
                        </div>
                    )}
                    {isLoad && (
                        <div>
                            <p>
                                You Have made some changes <br /> Do you want to
                                save or discard them ?
                            </p>
                            <div className='loadButton'>
                                <Button
                                    className='loadButtons'
                                    style={{ width: '80px' }}
                                >
                                    Save As
                                </Button>
                                <Button
                                    style={{ width: '80px' }}
                                    className='loadButtons'
                                    style={{ width: '80px' }}
                                    onClick={() => {
                                        setVisible(true);
                                        setIsSave(true);
                                        setIsLoad(false);
                                    }}
                                >
                                    Save
                                </Button>
                                <Button
                                    style={{ width: '80px' }}
                                    className='loadButtons'
                                    onClick={() => {
                                        setVisible(true);
                                        setIsSave(true);
                                        setIsLoad(false);
                                    }}
                                >
                                    Discard
                                </Button>
                            </div>
                        </div>
                    )}
                    {isNew && (
                        <div>
                            <p>
                                You Have made some changes <br /> Do you want to
                                save or discard them ?
                            </p>
                            <div className='loadButton'>
                                <Button className='viewCreation-loadBtn'>
                                    Save As
                                </Button>
                                <Button
                                    className='viewCreation-loadBtn'
                                    onClick={() => {
                                        setVisible(true);
                                        setIsSave(true);
                                        setIsLoad(false);
                                    }}
                                >
                                    Save
                                </Button>
                                <Button
                                    className='viewCreation-loadBtn'
                                    onClick={() => {
                                        setVisible(true);
                                        setIsSave(true);
                                        setIsLoad(false);
                                    }}
                                >
                                    Discard
                                </Button>
                            </div>
                        </div>
                    )}
                    {isDiscard && (
                        <div>
                            <p>Are you sure you want to discard changes ?</p>
                            <div className='discardButton'>
                                <Button className='viewCreation-loadBtn'>
                                    Ok
                                </Button>
                                <Button className='viewCreation-loadBtn'>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
}

export default ChartPersonalization;
