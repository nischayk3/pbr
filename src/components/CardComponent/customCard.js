import React from 'react';
import { Card } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import './styles.scss';

const customCard = (props) => {
    return (
       
            <div className="approval-cards" tabIndex="0">
                <div className="circle_icon" >
                    <BarChartOutlined />
                </div>
                <p className="approve-title">{props.count}</p>
                <p className="approve-desc">{props.desc}</p>
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
