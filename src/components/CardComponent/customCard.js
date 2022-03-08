import React from 'react';
import { Card } from 'antd';
import { BarChartOutlined ,ProjectOutlined,LayoutOutlined,FileDoneOutlined,FolderOpenOutlined,FileSyncOutlined} from '@ant-design/icons';
import './styles.scss';

const customCard = (props) => {
    return (

        <div className={props.count===0?'approval-cards-disabled':'approval-cards'} tabIndex="0">
            <div className={props.count===0?'circle_icon-disabled':'circle_icon'} >
                {props.desc=='View Approval' && <LayoutOutlined />}
                {props.desc=='Param Approval' && <ProjectOutlined />}
                {props.desc=='Chart Approval' && <BarChartOutlined />}
                {props.desc=='Report Approval' && <FileDoneOutlined />}
                {props.desc=='Pbr Approval' && <FolderOpenOutlined />}
                {props.desc=='Dtload Approval' && <FileSyncOutlined />}
            </div>
            <div className={props.count===0?'card_desc-disabled':'card_desc'}>
                <p className={props.count===0?'approve-title-disabled':'approve-title'}>{props.count}</p>
                <p className={props.count===0?'approve-desc-disabled':'approve-desc'}>{props.desc}</p>
            </div>

        </div>


        // {/* <div className="approve-wrapper">
        // <div className="approval-cards">
        //     <div className="circle_icon">
        //         <BarChartOutlined />
        //     </div>
        //     <p className="approve-title">5</p>
        //     <p className="approve-desc">parameter Data Approval</p>
        // </div>
        // <div className="approval-cards">
        //     <div className="circle_icon">
        //         <BarChartOutlined />
        //     </div>
        //     <p className="approve-title">5</p>
        //     <p className="approve-desc">parameter Data Approval</p>
        // </div>
        // </div> */}


    )
}

export default customCard;
