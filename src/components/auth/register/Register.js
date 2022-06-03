import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { registerUser } from '../../../utils/http-utils/user-request';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Register.scss';

export function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    isActive: false,
    name: '',
    picture: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });

  const onInputChange = (event) => {
    let value = event.target.value;
    setUser((prevState) => {
      return {
        ...prevState,
        [event.target.name]: value,
      };
    });

    setError('');
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    registerUser(user)
      .then(() => {
        navigate('/users-list');
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="user-form-wrapper">
      <Form onSubmit={onFormSubmit}>
        <h2>Register</h2>
        <br />
        {error && <span className="text-danger">{error}</span>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            value={user.name}
            type="text"
            placeholder="Enter full name"
            onChange={onInputChange}
            name="name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={user.email}
            type="email"
            placeholder="Enter email"
            onChange={onInputChange}
            name="email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Picture</Form.Label>
          <Form.Control
            value={user.picture}
            type="text"
            onChange={onInputChange}
            name="picture"
            placeholder="Enter link of picture"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            value={user.phone}
            onChange={onInputChange}
            name="phone"
            type="tel"
            placeholder="Enter phone"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={user.address}
            onChange={onInputChange}
            name="address"
            type="text"
            placeholder="Enter address"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={user.password}
            onChange={onInputChange}
            name="password"
            type="password"
            placeholder="Enter password"
            required
          />
        </Form.Group>
        <div>
          <span>You have account? </span>
          <Link to="/login">Login here</Link>
        </div>
        <br />
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}
