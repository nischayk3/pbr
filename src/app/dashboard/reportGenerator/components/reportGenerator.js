import React, { useEffect } from 'react';
import {
    Button,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import ReportDesignerForm from '../components/reportGeneratorHeader';

function ReportGenerator() {

    const dispatch = useDispatch();
    useEffect(() => {

    }, []
    );

    return (
        <div className="reportDesigner-container">
            <div className="reportDesigner-block">
                <h1 className="reportDesigner-headline">
                    <ArrowLeftOutlined /> Report Generator
                </h1>
                <div className="reportDesigner-btns">
                    <Button>
                        Cancel
                    </Button>
                </div>     
            </div>
            <ReportDesignerForm />


        </div>
    );
}

export default ReportGenerator;
