import React, { useEffect, useState } from 'react'
import { Input, Col, Row, Card, Avatar, Button, Pagination } from 'antd';
import { getPdfData } from '../../../../services/pbrService'
import pdfIcon from '../../../../assets/pdfIcon.png'
import greenCircle from '../../../../assets/greenCircle.png'
import red_circle from '../../../../assets/red_circle.png'
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
	hideLoader,
	showLoader,
	showNotification
} from '../../../../duck/actions/commonActions';
import { useDispatch } from 'react-redux';
import './style.scss'
import { async } from 'q';
const { Search } = Input;



function LandingPage() {
    const dispatch = useDispatch();
    let history = useHistory();
    const match = useRouteMatch();
    const [cardData, setCardData] = useState([])
    const [number, setNumber] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(8);
    const [countFile, setCountFile] = useState(0);
    useEffect(() => {
        getPdfMetaData()
    }, [])

    const getPdfMetaData = async (value,index) => {
        dispatch(showLoader());
        try {
            let req = {
                search_text: value ? value : null,
                file_id: null,
                duration: null,
                limit:8,
                page_index:index ? index : number
            }
            let res = await getPdfData(req)
            if (res['status-code'] === 200) {
                dispatch(hideLoader());
                setCardData(res.Data)
                setCountFile(res.Count)
            } else {
                setCardData([])
                dispatch(hideLoader());
            }
        } catch (err) {
            dispatch(hideLoader());
            console.log(err)
        }

    }


    const handleSizeChanger = (current, size) => {
        setPostsPerPage(size)
    }

    // let newData = cardData.slice((number - 1) * postsPerPage, postsPerPage * number);

    const onSearch = (value) => {
        if (value) {
            getPdfMetaData(value)
        } else {
            getPdfMetaData()
        }

    };

    const handleViewDetails = (val) => {
        history.push(`${match.url}/${val}`);
    }

    const handlePage = (pageNumber,size) => {
        console.log("pageNumber,size",pageNumber,size)
        setNumber(pageNumber)
        getPdfMetaData(null,pageNumber)

    }
    return (
        <div className='landingDiv'>
            <div className='search-bar'>
                <Search
                    className='search'
                    placeholder="Search by PDF name,ID,material,batch or associated templates"
                    allowClear
                    onSearch={onSearch}
                    onPressEnter={onSearch}
                />
            </div>

            <div style={{ marginTop: 30 }}>
                <div className='pagination'>
                    <Pagination size="small"
                        total={countFile}
                        showTotal={(total) => `Total ${total} items`}
                        // defaultCurrent={number}
                        pageSize={postsPerPage}
                        onChange={handlePage}
                        onShowSizeChange={handleSizeChanger}
                    />
                </div>
                <Row gutter={[32, 16]}>
                    {cardData.map((item, index) => (
                        <Col span={12} key={index}>
                            <Card className='cardStyle' bordered={false} key={index}>
                                <Row>
                                    <Col span={8}>
                                        <img src={pdfIcon} style={{ height: 202, width: 169 }} />
                                    </Col>
                                    <Col span={16}>

                                        <p className='pdfHeader'>{item.filename}</p>
                                        <div style={{ marginTop: 7 }}>
                                            <img src={item.status === "P" ? greenCircle : red_circle} style={{ width: item.status === "P" ? 10 : 30 }} />
                                            <span style={{ fontWeight: 600, marginLeft: item.status === "P" ? 15 : 7 }}>{item.status === "P" ? "Success" : "Fail"}</span>
                                        </div>
                                        <div className='divContainer'>
                                            <div>
                                                <p className='pStyle' >Batch</p>
                                                <p className='pValue'> {item.batch_num}</p>
                                            </div>
                                            <div>
                                                <p className='pStyle'>Product</p>
                                                <div style={{marginRight:70}}>
                                                    <p className='pValue'> {item.product_num}</p>
                                                    {/* <Avatar
                                                        className='avatar-icon'
                                                        style={{ backgroundColor: getRandomColor(index + 1) }}>
                                                        {item.created_by?.split('')[0]?.toUpperCase()}{' '}
                                                    </Avatar> */}
                                                    {/* <span className='avatar-text' style={{ marginLeft: 10 }}>{item.created_by.split('@')[0]}</span> */}
                                                </div>
                                            </div>

                                        </div>
                                        <div className='buttonDiv'>
                                            <div>
                                                <p className='pStyle' >Site</p>
                                                <p className='pValue'> {item.site_code}</p>
                                            </div>
                                            {/* <Button style={{ width: 150 }} className='custom-primary-btn'>
                                                Download
                                            </Button> */}
                                            <Button onClick={() => handleViewDetails(item.file_id)} style={{ width: 150,marginTop:27 }} className='custom-secondary-btn'>
                                                View Details
                                            </Button>
                                        </div>


                                    </Col>
                                </Row>

                            </Card>
                        </Col>
                    ))}

                </Row>
            </div>
        </div>
    )
}

export default LandingPage