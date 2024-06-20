import { Container, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import ProfileCard from "../components/ProfileCard";

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          {user ? (
            <ProfileCard userInfo={user} />
          ) : (
            <>
              <h1 className="text-center mb-4">MERN App</h1>
              <div className="d-flex">
                <LinkContainer to="/login">
                  <Button variant="primary" className="me-3">
                    Sign In
                  </Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button variant="secondary">Register</Button>
                </LinkContainer>
              </div>
            </>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default HomePage;
