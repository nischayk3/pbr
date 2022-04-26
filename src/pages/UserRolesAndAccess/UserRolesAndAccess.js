import { useHistory, useRouteMatch } from 'react-router-dom'
import { Row, Col } from 'antd'

import BreadCrumbWrapper from '../../components/BreadCrumbWrapper'
import ScreenHeader from '../../components/ScreenHeader/screenHeader';
import headerImage from '../../assets/images/ChartBanner.svg';

const UserRolesAndAccess = () => {
    const history = useHistory()
    const match = useRouteMatch()

    const redirectTo = pathname => history.push(`${match.url}/${pathname}`)

    return (
        <>
            <BreadCrumbWrapper />
            <ScreenHeader
                bannerbg={{ background: 'linear-gradient(180deg, #F5EBEB 100%, #FBC2BD 4%)' }}
                title={`Howdy, ${'<<User Name>>'}`}
                description="Let's personalize some charts today!"
                source={headerImage}
                sourceClass='dashboard-image'
            />

            <Row className='create-new-row'>
                <Col span={4} onClick={() => redirectTo('user-configuration')}>
                    <div className='create-new'>
                        <p>User Configuration</p>
                    </div>
                </Col>
                <Col span={4} onClick={() => redirectTo('roles-and-access')}>
                    <div className='create-new'>
                        <p>Roles And Access</p>
                    </div>
                </Col>
                <Col span={4} onClick={() => redirectTo('screen-access')}>
                    <div className='create-new'>
                        <p>Screen Access</p>
                    </div>
                </Col>
            </Row>

            <style>{`
                .create-new-row {
                   display: flex;
                   justify-content: center;
                   align-items: center;
                   margin-top: 2rem;
                }
                .create-new {
                    height: 137px;
                    width: 175px;
                    border-radius: 4px;
                    background: #ffffff;
                    border: 1px dashed #d9d9d9;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }
                svg {
                    margin-top: 10px !important;
                    font-size: 40px;
                    color: #cbcbcb;
                }
                p {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 22px;
                    color: #494949;
                }
            `}</style>
        </>
    )
}

export default UserRolesAndAccess