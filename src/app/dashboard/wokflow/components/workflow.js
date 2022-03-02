import React from 'react';
import { Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Dash_Card from '../../../../components/CardComponent/customCard';
import './styles.scss';
import Item from 'antd/lib/list/Item';


const config = [
    {
        count: 5,
        desc: 'Parameter data Approval'
    },
    {
        count: 2,
        desc: 'View Approval'
    },
    {
        count: 2,
        desc: 'Chart Approval'
    },
    {
        count: 0,
        desc: 'Report Approval'
    },
    {
        count: 0,
        desc: 'PBR Approval'
    },
    {
        count: 0,
        desc: 'Data Load Screen Approval'
    }
]

const Workflow = () => {
    return (
        <div className='custom-wrapper'>
            <div className='sub-header'>
                <div className='sub-header-title'>
                    <ArrowLeftOutlined className='header-icon' />
                    <span className='header-title'>Workflow</span>

                </div>
            </div>
            <div className='custom-content-layout'>
                <Card title='Approval Dashboard' style={{ width: '100%' }}>
                    <p className='dash-username'>Hello[username],welcome back!</p>
                    <div className='workflow_items approve-wrapper'>
                    {
                         
                        config.map((item, index) => {
                            return (
                                    <Dash_Card count={item.count} desc={item.desc}/>
                            )
                        })
                    }
                    </div>
                    {/* <div className='workflow_items approve-wrapper'>
                    <Dash_Card/>
                    </div> */}

                </Card>
            </div>

        </div>
    )
}

export default Workflow;