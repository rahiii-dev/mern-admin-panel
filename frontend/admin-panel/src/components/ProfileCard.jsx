import { Button } from "react-bootstrap";
import { SERVER_IMG_ENDPOINT } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ userInfo }) => {
  const { email, fullName, profileImage } = userInfo;
  const navigate = useNavigate()
  return (
    <div>
      <div className="profile-image">
        <img src={`${SERVER_IMG_ENDPOINT}${profileImage}`} alt="profileImage" />
      </div>
      <div className="text-center mt-2">
        <p>
          <span className="fw-bold">Email : </span>
          {email}
        </p>
        <p>
          <span className="fw-bold">Name : </span>
          {fullName}
        </p>
        <Button onClick={() => navigate('/edit-profile')}>Edit Profile</Button>
      </div>
    </div>
  );
};

export default ProfileCard;
