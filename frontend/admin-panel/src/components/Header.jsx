import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../app/features/api/userApiSlice";
import { clearCredential } from "../app/features/auth/authSlice";

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  const [logoutUser, {isLoading}] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(clearCredential())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MERN App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user ? (
                <>
                  {user?.isAdmin && (
                    <LinkContainer to="/users">
                      <Nav.Link>
                        <FaUser /> Users
                      </Nav.Link>
                    </LinkContainer>
                  )}
                  <Button variant="danger" onClick={handleLogout} disabled={isLoading}>Logout</Button>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
