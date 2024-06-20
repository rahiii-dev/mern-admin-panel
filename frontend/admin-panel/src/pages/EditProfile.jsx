import { useState } from 'react';
import { Form, Button} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useEditProfileMutation } from '../app/features/api/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SERVER_IMG_ENDPOINT } from '../utils/constants';
import { setCredential } from "../app/features/auth/authSlice";
import { toast } from 'react-toastify';

const EditProfile = () => {
    const user  = useSelector(state => state.auth.user);

    const [formData, setFormData] = useState({
        name: user?.fullName,
        email: user?.email,
        profileImage: null, 
      });
    
      const [imagePreview, setImagePreview] = useState(null)
    
      const [formError, setFormError] = useState({
        nameError: '',
        emailError: '',
      });
    
      const [error, setError] = useState('');
    
      const [updateProfile, {isLoading}] = useEditProfileMutation();
    
      const dispatch = useDispatch()
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
      const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            profileImage: imageFile,
          }));
          const imageUrl = URL.createObjectURL(imageFile);
          setImagePreview(imageUrl)
        }
      };
    
      const validateForm = () => {
        setFormError({
          nameError: '',
          emailError: '',
        });
    
        let isValid = true;
    
        if (!formData.name.trim()) {
          setFormError((prevError) => ({
            ...prevError,
            nameError: 'Name is required',
          }));
          isValid = false;
        }
    
        if (!formData.email.trim()) {
          setFormError((prevError) => ({
            ...prevError,
            emailError: 'Email is required',
          }));
          isValid = false;
        }

        return isValid;
      };
    
      const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        if (!validateForm()) return;
    
        const formDataToSend = new FormData();
        formDataToSend.append('id', user?._id)
        formDataToSend.append('fullName', formData.name.trim());
        formDataToSend.append('email', formData.email.trim());
        if(formData.profileImage){
            formDataToSend.append('profileImage', formData.profileImage);
        }
    
        try {
          const res = await updateProfile(formDataToSend).unwrap();
          dispatch(setCredential(res))
          toast.success("Your Profile is updated");
        } catch (error) {
          setError(error.data?.message || 'Profile Upate failed');
        }
      };
    
      return (
        <FormContainer>
          <h1>Update Profile</h1>
          <Form onSubmit={submitHandler}>
            <div id='profile-image-container'>
              <label htmlFor='profile-image-input'>Choose Image</label>
              <input id='profile-image-input' type='file' className='hidden' onChange={handleImageChange} accept='image/*' />
              <img src={imagePreview ? imagePreview : `${SERVER_IMG_ENDPOINT}${user?.profileImage}`} />
            </div>
    
            <Form.Group className='my-2' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
              />
              {formError.nameError && <p className='text-danger'>{formError.nameError}</p>}
            </Form.Group>
    
            <Form.Group className='my-2' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
              />
              {formError.emailError && <p className='text-danger'>{formError.emailError}</p>}
            </Form.Group>
    
            {error && <p className='text-danger'>{error}</p>}
    
            <Button type='submit' variant='primary' className='mt-3' disabled={isLoading}>
              Save Changes
            </Button>
          </Form>
    
        </FormContainer>
      );
}

export default EditProfile;
