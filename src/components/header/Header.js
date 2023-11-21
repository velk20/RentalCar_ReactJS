import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedUser, logout } from '../../utils/http-utils/user-request';
import './Header.scss';
import {Login} from "../auth/login/Login";
import {Register} from "../auth/register/Register";

export function Header() {
  const loggedUser = getLoggedUser();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout().then(() => {
      navigate('/');
    });
  };

  const redirectToEditUser = () => {
    navigate(`/user/editUser/${loggedUser.id}`);
  };

  return (
    <div className="header">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link className="nav-link" to="/">
              Rental Car
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/vehicles-list">
                Vehicles
              </Link>

              {loggedUser && loggedUser.isAdmin && (
                <Link className="nav-link" to="/users-list">
                  Users
                </Link>
              )}

              <Link className="nav-link" to="/rents-list">
                {loggedUser && (loggedUser.isAdmin ? 'All Rents' : 'Your Rents')}
              </Link>

              {loggedUser && !loggedUser.isAdmin && (
                <Link
                  className="nav-link"
                  to={'/user/editUser/' + loggedUser.id}
                >
                  Edit Your User
                </Link>
              )}

              {loggedUser && loggedUser.isAdmin && (
                <Link className="nav-link" to="/vehicle/create">
                  Create Vehicle
                </Link>
              )}
              {loggedUser && loggedUser.isAdmin && (
                <Link className="nav-link" to="/user/create">
                  Create User
                </Link>
              )}


            </Nav>
            {loggedUser && (
              <span className="nav-link logout-btn" onClick={logoutHandler}>
                Logout
              </span>
            )}


            {!loggedUser && (
                <Link className="nav-link navBarLink" to="/login">
                  Login
                </Link>
            )}

            {!loggedUser && (
                <Link className="nav-link navBarLink" to="/register">
                  Register
                </Link>
            )}


          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
