/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 14 March, 2022
 * @Last Changed By - @Mihir 
 */

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
    {

       let user_details = localStorage.getItem('username')
       let user = user_details && user_details ? user_details : ''

       setReportId(ReportData['rep_disp_id'] ? ReportData['rep_disp_id'] : '')
       setReportName(ReportData['rep_name'] ? ReportData['rep_name'] : '')
       setReportStatus(ReportData['rep_status'] ? ReportData['rep_status'] : '')
       if(ReportData['view_disp_id'])
       setViewId(ReportData['view_disp_id'] && ReportData['view_version'] ? ReportData['view_disp_id'] + '-' + ReportData['view_version'] : '')
       else
       setViewId(ReportData['view_id'] && ReportData['view_id'] ? ReportData['view_id'] : '')
       setVariantname(ReportData['variant_name'] ? ReportData['variant_name'] : user+'_variant')
    }

    return (
        // <div className="reportDesigner-gen bg-white" >
        //     <div className="reportDesigner-block-left bg-white" >
        <div className="generator-header">
                <div>
                Report ID : {reportId}
                </div>
                <div>
                Report Name : {reportName}                  
                </div>
                <div>
                View : {viewId}
                </div>
                <div>
                Status : {reportStatus}
                </div>
                <div>
                Variant : {variantname}  
                </div>

            </div>
        // </div>
    );
}

export default ReportDesignerForm;
