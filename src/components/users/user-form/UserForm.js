import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './UserForm.scss';
import { useEffect, useState } from 'react';
import {
  saveUser,
  getUserById,
  getLoggedUser,
} from '../../../utils/http-utils/user-request';
import  * as validatorService from '../../../utils/validators/validator';
import { useNavigate, useParams } from 'react-router-dom';

export function UserForm() {
  const params = useParams();
  const navigate = useNavigate();
  const loggedUser = getLoggedUser();
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

  useEffect(() => {
    if (params.id) {
      getUserById(params.id)
          .then((user) => {
        setUser(user.data);
      })
          .catch((err)=> navigate('/404'));
    }
  }, [params.id]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    user.totalRentedCars = Number(user.totalRentedCars);

    saveUser(user)
        .then(() => {
              navigate('/');
        })
        .catch((error)=>setErrors({message: error.message}));
  };

  const onInputChange = (event) => {
    let value = event.target.value;
    if (event.target.name === 'isAdmin') {
      value = event.target.checked;
    }

    setUser((prevState) => {
      return {
        ...prevState,
        [event.target.name]: value,
      };
    });

    delete errors.message
  };

  return (
    <div className="userForm-wrapper">
      <Form onSubmit={onFormSubmit}>
        <h2>{user.id ? 'Edit User' : 'Create User'}</h2>
        <br/>
        {errors.message && <p className="bg-danger fw-semibold">{errors.message}</p>}
        <Form.Group className="mb-3" controlId="formBasicName">
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

        <Form.Group className="mb-3" controlId="formBasicUrl">
          <Form.Label>Picture</Form.Label>
          <Form.Control
            value={user.picture}
            type="text"
            onChange={onInputChange}
            onBlur={(e)=>validatorService.imageValidation(e, setErrors)}
            name="picture"
            placeholder="Enter link of picture"
            required
          />
          {errors.picture && (
              <span className="text-danger">
                Picture URL is not valid.
              </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
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

        <Form.Group className="mb-3" controlId="formBasicAddress">
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

        {loggedUser.isAdmin && (
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                  value={user.password}
                  onChange={onInputChange}
                  onBlur={(e)=>validatorService.minLength(e, 5, setErrors, user)}
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  required
              />
              {errors.password && (
                  <span className="text-danger">
                Password must be at least 5 symbols.
              </span>
              )}
            </Form.Group>
        )}

        {loggedUser.isAdmin && (
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Admin"
              name="isAdmin"
              checked={user.isAdmin}
              onChange={onInputChange}
            />
          </Form.Group>
        )}

        <Button variant="primary" type="submit" disabled={!validatorService.isFormValid(errors)}>
          {user.id ? 'Edit User' : 'Create User'}
        </Button>
      </Form>
    </div>
  );
}
