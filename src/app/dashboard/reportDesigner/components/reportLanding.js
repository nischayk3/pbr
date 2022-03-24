import React, { useState, useEffect } from 'react'
import { Card, Input, Divider, Table } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import illustrations from '../../../../assets/images/landing_image.png';
import './style.scss';



export default function Landing(props) {

    const [resultDate, setResultDate] = useState('');

    useEffect(() => {
        updateDate();
    }, []);

    const updateDate = () => {
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const latestDate = date.getDate();
        const year = date.getFullYear();
        const resultDate = month + ' ' + latestDate + ',' + ' ' + year
        setResultDate(resultDate);
    }
    return (
        <div>
            <div className='custom-wrapper'>
                <div className='sub-header'>
                    <div className='sub-header-title'>
                        <ArrowLeftOutlined className='header-icon' />
                        <span className='header-title'>Report Designer</span>

                    </div>
                </div>
                <div className='custom-content-layout'>
                    <Card className='workflow_head'>
                        <div>
                            <p className='dash-username'>Howdy {(localStorage.getItem('user'))}!</p>
                            <p className='dash-text'>Let's get designing some report templates!</p>
                        </div>
                        <img  src={illustrations} className='illustration' />
                        <span className='resultdate'>{resultDate}</span>

                    </Card>

                    <center>
                    <Card style={{ width: '784px',marginTop : '21px' }}>
                        <Input.Search placeholder="Search by name, view, product number"
                            allowClear
                            enterButton="Search"
                            size="medium"
                        />
                        <div className="create_new">
                        <PlusOutlined /><br/>
                        Create New Chart        
                        </div><br/>
                        <p style={{marginRight:'550px'}}>Recently Created Charts </p>
                        <Divider/>
                        <Table/>
                    </Card>
                    </center>
                    

                </div>
            </div>
        </div>
    )
}