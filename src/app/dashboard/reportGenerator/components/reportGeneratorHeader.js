// # Mihir Bagga
// # Mareana Software
// # Version 1
// # Last modified - 3 Mar 2022

import React, {useState,useEffect} from 'react';
import {
    Typography
} from 'antd';
import { useSelector } from 'react-redux';
import InputField from '../../../../components/InputField/InputField';
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
      const [variantname,setVariantname] = useState('')
      const [viewId,setViewId] = useState('')

      useEffect(() => {
        unload(repotData)
    }, [repotData]
    );
    const unload = (ReportData) =>
    {  console.log(ReportData)
       let user_details = JSON.parse(localStorage.getItem('user_details'))
       let user = user_details["username"] ? user_details["username"] : ''

       setReportId(ReportData['rep_disp_id'] ? ReportData['rep_disp_id'] : '')
       setReportName(ReportData['rep_name'] ? ReportData['rep_name'] : '')
       setReportStatus(ReportData['rep_status'] ? ReportData['rep_status'] : '')
       setViewId(ReportData['view_disp_id'] && ReportData['view_version'] ? ReportData['view_disp_id']+'-'+ReportData['view_version'] : '')
       setVariantname(ReportData['rep_disp_id'] ? ReportData['rep_disp_id'] : user+'_variant')
    }

    return (
        <div className="reportDesigner-grid bg-white" >
            <div className="reportDesigner-block-left bg-white" >
                <div>
                <Text className="filter-text" >Report ID</Text><br/>
                <InputField className="filter-button" value={reportId} disabled={true} />
                </div>
                <div>
                <Text className="filter-text" >Report Name</Text><br/>
                <InputField className="filter-button" value={reportName}  disabled={true} />                    
                </div>
                <div>
                <Text className="filter-text">View</Text><br/>
                <InputField className="filter-button" value={viewId}  disabled={true} />
                </div>
                <div>
                <Text className="filter-text">Status</Text><br/>
                <InputField className="filter-button" value={reportStatus}  disabled={true} />
                </div>
                <div>
                <Text className="filter-text">Variant</Text><br/>
                <InputField className="filter-button" value={variantname}  disabled={true} />
                </div>

            </div>
        </div>
    );
}

export default ReportDesignerForm;
