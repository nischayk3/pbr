import BreadCrumbWrapper from '../../../components/BreadCrumbWrapper/index'
import GoBack from '../../../components/GoBack/GoBack';

const RolesAndAccess = () => {

    return (
        <div className='custom-wrapper'>
            <BreadCrumbWrapper />
            <GoBack currentPage="Roles and access" />
        </div>
    )
}

export default RolesAndAccess