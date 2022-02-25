import React, {useState,useEffect} from 'react';
import {
    Input,
    Typography
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

const { Text } = Typography

function ReportDesignerForm(props) {

    const repotData = useSelector(
        (state) => state.reportDesignerReducer.reportData
      );
      console.log(repotData)

      const [ReportData, setReportData] = useState(repotData)
      const [reportId,setReportId] = useState('')
      const [reportName,setReportName] = useState('')
      const [reportStatus,setReportStatus] = useState('')
      const [viewId,setViewId] = useState('')

      useEffect(() => {
        unload(ReportData)
    }, [ReportData]
    );
    const unload = (ReportData) =>
    {
       setReportId(ReportData['rep_disp_id'])
       setReportName(ReportData['rep_name'])
       setReportStatus(ReportData['rep_status'])
       setViewId(ReportData['view_disp_id'] && ReportData['view_version'] ? ReportData['view_disp_id']+'-'+ReportData['view_version'] : '')
    }

    return (
        <div className="reportDesigner-grid bg-white" >
            <div className="reportDesigner-block-left bg-white" >
                <Text className="filter-text" >Report ID</Text>
                <Text className="filter-text" >Report Name</Text>
                <Text className="filter-text">View</Text>
                <Text className="filter-text">Status</Text>
                <Input className="filter-button" value={reportId} disabled={true} />
                <Input className="filter-button" value={reportName}  disabled={true} />
                <Input className="filter-button" value={viewId}  disabled={true} />
                <Input className="filter-button" value={reportStatus}  disabled={true} />
            </div>
        </div>
    );
}

export default ReportDesignerForm;
