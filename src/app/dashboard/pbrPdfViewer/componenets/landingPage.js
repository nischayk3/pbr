import React, { useEffect, useState } from 'react'
import { Input, Col, Row, Card, Avatar, Button, Pagination } from 'antd';
import { getPdfData } from '../../../../services/pbrService'
import pdfIcon from '../../../../assets/pdfIcon.png'
import greenCircle from '../../../../assets/greenCircle.png'
import red_circle from '../../../../assets/red_circle.png'
import { useHistory, useRouteMatch } from 'react-router-dom';
import './style.scss'
import { async } from 'q';
const { Search } = Input;



function LandingPage() {
    let history = useHistory();
    const match = useRouteMatch();
    const [cardData, setCardData] = useState([])
    const [number, setNumber] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(8);
    useEffect(() => {
        getPdfMetaData()
    }, [])

    const getPdfMetaData = async (value) => {
        try {
            let req = {
                search_text: value ? value : null,
                file_id: null,
                duration: null
            }
            let res = await getPdfData(req)
            if (res['status-code'] === 200) {
                setCardData(res.Data)
            } else {
                setCardData([])
            }
        } catch (err) {
            console.log(err)
        }

    }

    const getRandomColor = index => {
        let colors = ['#56483F', '#728C69', '#c04000', '#c19578'];
        return colors[index % 4];
    };

    const handleSizeChanger = (current, size) => {
        setPostsPerPage(size)
    }

    let newData = cardData.slice((number - 1) * postsPerPage, postsPerPage * number);

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

    const handlePage = (pageNumber) => setNumber(pageNumber);
    return (
        <div className='landingDiv'>
            <div className='search-bar'>
                <Search
                    className='search'
                    placeholder="input search text"
                    allowClear
                    onSearch={onSearch}
                    onPressEnter={onSearch}
                />
            </div>

            <div style={{ marginTop: 30 }}>
                <div className='pagination'>
                    <Pagination size="small"
                        total={cardData.length}
                        showTotal={(total) => `Total ${total} items`}
                        // defaultCurrent={number}
                        pageSize={postsPerPage}
                        onChange={handlePage}
                        onShowSizeChange={handleSizeChanger}
                    />
                </div>
                <Row gutter={[32, 16]}>
                    {newData.map((item, index) => (
                        <Col span={12} key={index}>
                            <Card className='cardStyle' bordered={false} key={index}>
                                <Row>
                                    <Col span={8}>
                                        <img src={pdfIcon} style={{ height: 202, width: 156 }} />
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

                    {/* <Col span={12} />
                    <Col span={12} />

                    <Col span={12} />
                    <Col span={12} /> */}
                </Row>
            </div>
        </div>
    )
}

export default LandingPage