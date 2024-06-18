import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import defaultuser from '/defaultuser.jpg';
import { useRegisterMutation } from '../app/features/api/userApiSlice';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: null, 
  });

  const [imagePreview, setImagePreview] = useState(null)

  const [formError, setFormError] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  const [error, setError] = useState('');

  const [registerUser, {isLoading}] = useRegisterMutation();

  const navigate = useNavigate();

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
      passwordError: '',
      confirmPasswordError: '',
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

    if (!formData.password.trim()) {
      setFormError((prevError) => ({
        ...prevError,
        passwordError: 'Password is required',
      }));
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError((prevError) => ({
        ...prevError,
        confirmPasswordError: 'Passwords do not match',
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
    formDataToSend.append('fullName', formData.name.trim());
    formDataToSend.append('email', formData.email.trim());
    formDataToSend.append('password', formData.password.trim());
    formDataToSend.append('profileImage', formData.profileImage);

    try {
      const res = await registerUser(formDataToSend).unwrap();
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: null, 
      })
      navigate('/login');
    } catch (error) {
      setError(error.data?.message || 'Registration failed');
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <div id='profile-image-container'>
          <label htmlFor='profile-image-input'>Choose Image</label>
          <input id='profile-image-input' type='file' className='hidden' onChange={handleImageChange} accept='image/*' />
          <img src={imagePreview ? imagePreview : defaultuser} />
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

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
          />
          {formError.passwordError && <p className='text-danger'>{formError.passwordError}</p>}
        </Form.Group>

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          {formError.confirmPasswordError && (
            <p className='text-danger'>{formError.confirmPasswordError}</p>
          )}
        </Form.Group>

        {error && <p className='text-danger'>{error}</p>}

        <Button type='submit' variant='primary' className='mt-3' disabled={isLoading}>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account? <Link to={`/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
