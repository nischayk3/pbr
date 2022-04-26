import { useHistory, useRouteMatch } from 'react-router-dom'
import { Row, Col } from 'antd'

import BreadCrumbWrapper from '../../components/BreadCrumbWrapper'
import ScreenHeader from '../../components/ScreenHeader/screenHeader';
import headerImage from '../../assets/images/ChartBanner.svg';
import './UserRolesAndAccess.scss';

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

        </>
    )
}

export default UserRolesAndAccess