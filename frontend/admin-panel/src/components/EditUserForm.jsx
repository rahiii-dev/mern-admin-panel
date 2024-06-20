import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useEditProfileMutation } from "../app/features/api/userApiSlice";
import { useDispatch } from "react-redux";
import { SERVER_IMG_ENDPOINT } from "../utils/constants";
import { setCredential } from "../app/features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditUserForm = ({ userInfo: user, forAdmin }) => {
  const [formData, setFormData] = useState({
    name: user?.fullName,
    email: user?.email,
    isAdmin: user?.isAdmin,
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const [formError, setFormError] = useState({
    nameError: "",
    emailError: "",
  });

  const [error, setError] = useState("");

  const [updateProfile, { isLoading }] = useEditProfileMutation();

  const dispatch = useDispatch();
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
      setImagePreview(imageUrl);
    }
  };

  const handleRadiochange = (e) => {
    const value = e.target.value === "false" ? false : true;
    setFormData((prevFormData) => ({
      ...prevFormData,
      isAdmin: value,
    }));
  };

  const validateForm = () => {
    setFormError({
      nameError: "",
      emailError: "",
    });

    let isValid = true;

    if (!formData.name.trim()) {
      setFormError((prevError) => ({
        ...prevError,
        nameError: "Name is required",
      }));
      isValid = false;
    }

    if (!formData.email.trim()) {
      setFormError((prevError) => ({
        ...prevError,
        emailError: "Email is required",
      }));
      isValid = false;
    }

    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("id", user?._id);
    formDataToSend.append("fullName", formData.name.trim());
    formDataToSend.append("email", formData.email.trim());
    if (formData.profileImage) {
      formDataToSend.append("profileImage", formData.profileImage);
    }
    if(forAdmin){
        formDataToSend.append("isAdmin", formData.isAdmin);
    }

    try {
      const res = await updateProfile(formDataToSend).unwrap();
      if (!forAdmin) {
        dispatch(setCredential(res));
      }

      toast.success("Profile is updated");
    } catch (error) {
      setError(error.data?.message || "Profile Upate failed");
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center">{forAdmin ? 'Edit User Details' : 'Update Profile'}</h1>
      <Form onSubmit={submitHandler}>
        <div id="profile-image-container">
          {!forAdmin && (
            <label htmlFor="profile-image-input">Choose Image</label>
          )}

          <input
            id="profile-image-input"
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
          <img
            src={
              imagePreview
                ? imagePreview
                : `${SERVER_IMG_ENDPOINT}${user?.profileImage}`
            }
          />
        </div>

        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {formError.nameError && (
            <p className="text-danger">{formError.nameError}</p>
          )}
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {formError.emailError && (
            <p className="text-danger">{formError.emailError}</p>
          )}
        </Form.Group>

        {forAdmin && (
          <Form.Group className="my-2" controlId="isAdmin">
            <Form.Label>Admin</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Yes"
                name="isAdmin"
                value={true}
                checked={formData.isAdmin === true}
                onChange={handleRadiochange}
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="isAdmin"
                value={false}
                checked={formData.isAdmin === false}
                onChange={handleRadiochange}
              />
            </div>
          </Form.Group>
        )}

        {error && <p className="text-danger">{error}</p>}

        <div className="d-flex align-items-center justify-content-between mt-3">
          <Button
            type="submit"
            variant="primary"
            className=""
            disabled={isLoading}
          >
            Save Changes
          </Button>

          <Button variant="danger" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default EditUserForm;
