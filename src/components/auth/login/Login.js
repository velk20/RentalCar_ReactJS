import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../utils/http-utils/user-request';
import { Link } from 'react-router-dom';
import './Login.scss';

export function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const onInputChange = (event) => {
    setError('')

    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    login(user)
      .then(() => {
        navigate('/');
      })
      .catch((e) => setError(e.message));
  };

  return (
    <div className="user-form-wrapper">
      <Form onSubmit={onFormSubmit}>
        <h2>Login</h2>
        {error && <p className="bg-danger fw-semibold">{error}</p>}
        <br />
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
          <span>You don't have account? </span>
          <Link to="/register">Register here</Link>
        </div>
        <br />
        <Button variant="primary" type="submit">
          Login
        </Button>
        <p>Click  <Link to="/">here</Link> to redirect to home page</p>
      </Form>

    </div>
  );
}
