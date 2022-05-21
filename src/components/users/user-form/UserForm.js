import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './UserForm.scss';
import { useEffect, useState } from 'react';
import { saveUser, getUserById } from '../../../utils/http-utils/user-request';
import { useNavigate, useParams } from 'react-router-dom';

export function UserForm() {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    isActive: false,
    name: '',
    picture: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (params.id) {
      getUserById(params.id).then((user) => {
        setUser(user.data);
      });
    }
  }, [params.id]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    saveUser(user).then(() => {
      navigate('/users-list');
    });
  };

  const onInputChange = (event) => {
    let value = event.target.value;
    if (event.target.name === 'isActive') {
      value = event.target.checked;
    }

    setUser((prevState) => {
      return {
        ...prevState,
        [event.target.name]: value,
      };
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
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Active"
            name="isActive"
            checked={user.isActive}
            onChange={onInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
