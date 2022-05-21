import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'bootstrap';

export function Register() {
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
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    saveUser(user).then(() => {
      navigate('/users-list');
    });
  };

  return (
    <div className="user-form-wrapper">
      <Form onSubmit={onFormSubmit}>
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
