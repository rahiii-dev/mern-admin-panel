import { useSelector } from 'react-redux';
import EditUserForm from '../components/EditUserForm';

const EditProfile = () => {
    const user  = useSelector(state => state.auth.user);
    return <EditUserForm userInfo={user}/>
}

export default EditProfile;
