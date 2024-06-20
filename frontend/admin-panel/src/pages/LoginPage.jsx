import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../app/features/api/userApiSlice";
import { useDispatch } from "react-redux";
import { setCredential } from "../app/features/auth/authSlice";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    emailError: "",
    passwordError: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData( prevData => ({
      ...prevData,
      [e.target.name] : e.target.value
    }))
  }

  const validateForm = () => {
    setFormError({
      emailError: "",
      passwordError: "",
    })

    let isValid = true;

    if (!formData.email.trim()) {
      setFormError((prevError) => ({
        ...prevError,
        emailError: "Email is required",
      }));
      isValid = false;
    }

    if (!formData.password.trim()) {
      setFormError((prevError) => ({
        ...prevError,
        passwordError: "Password is required",
      }));
      isValid = false;
    }

    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if(!validateForm()) return;
    setError("");

    try {
      const res = await loginUser(formData).unwrap();
      dispatch(setCredential(res));
      const redirectTo = location.state?.from || '/';
      navigate(redirectTo, {replace : true});
    } catch (error) {
      if(error.status < 500){
        setError(error.data?.message || 'Login failed');
      }
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          ></Form.Control>
          {formError.emailError && <p className="text-danger">{formError.emailError}</p>}
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={handleChange}
          ></Form.Control>
          {formError.passwordError && <p className="text-danger">{formError.passwordError}</p>}
        </Form.Group>

        {error && <p className="text-danger">{error}</p>}

        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          disabled={isLoading}
        >
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link to={`/register`}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
