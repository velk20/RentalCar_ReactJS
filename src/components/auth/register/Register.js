import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { registerUser } from '../../../utils/http-utils/user-request';
import  * as validatorService from '../../../utils/validators/validator';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Register.scss';

export function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    isAdmin: false,
    name: '',
    picture: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    isVIP: false,
    totalRentedCars: 0,
  });

  const onInputChange = (event) => {
    let value = event.target.value;
    setUser((prevState) => {
      return {
        ...prevState,
        [event.target.name]: value,
      };
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    registerUser(user)
      .then(() => {
        navigate('/users-list');
      })
      .catch((error) => setErrors(error.message));
  };

  return (
    <div className="user-form-wrapper">
      <Form onSubmit={onFormSubmit}>
        <h2>Register</h2>
        <br />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            value={user.name}
            type="text"
            placeholder="Enter full name"
            onChange={onInputChange}
            onBlur={(e)=>validatorService.minMaxLength(e,3,30, setErrors, user)}
            name="name"
            required
          />
          {errors.name && (
              <span className="text-danger">
                Full name must be between 3 and 30 characters.
              </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={user.email}
            type="email"
            placeholder="Enter email"
            onChange={onInputChange}
            onBlur={(e)=>validatorService.emailValidation(e, setErrors)}
            name="email"
            required
          />
          {errors.email && (
              <span className="text-danger">
                Email is not valid.
              </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Picture</Form.Label>
          <Form.Control
            value={user.picture}
            type="text"
            onChange={onInputChange}
            onBlur={(e)=>validatorService.imageValidation(e, setErrors)}
            name="picture"
            placeholder="Enter link of picture"
          />
          {errors.picture && (
              <span className="text-danger">
                Picture URL is not valid.
              </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            value={user.phone}
            onChange={onInputChange}
            onBlur={(e)=>validatorService.phoneValidation(e, setErrors)}
            name="phone"
            type="tel"
            placeholder="Enter phone"
            required
          />
          {errors.phone && (
              <span className="text-danger">
                Phone number not valid for Bulgarian standards.
              </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={user.address}
            onChange={onInputChange}
            onBlur={(e)=>validatorService.minMaxLength(e,10, 150, setErrors, user)}
            name="address"
            type="text"
            placeholder="Enter address"
            required
          />
          {errors.address && (
              <span className="text-danger">
                Address must be between 10 and 150 characters.
              </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={user.password}
            onChange={onInputChange}
            onBlur={(e)=>validatorService.minMaxLength(e,4, 20, setErrors, user)}
            name="password"
            type="password"
            placeholder="Enter password"
            required
          />
          {errors.password && (
              <span className="text-danger">
                Password must be between 4 and 20 characters.
              </span>
          )}
        </Form.Group>
        <div>
          <span>You have account? </span>
          <Link to="/login">Login here</Link>
        </div>
        <br />
        <Button variant="primary" type="submit" disabled={!validatorService.isFormValid(errors)}>
          Register
        </Button>
      </Form>
    </div>
  );
}
