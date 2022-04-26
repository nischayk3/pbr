import BreadCrumbWrapper from '../../../components/BreadCrumbWrapper/index'
import GoBack from '../../../components/GoBack/GoBack';

const UserConfiguration = () => {
    return (
        <div className='custom-wrapper'>
            <BreadCrumbWrapper />
            <GoBack currentPage="User Configuration" />
        </div>
    )
}

export default UserConfiguration