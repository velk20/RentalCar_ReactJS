import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './VehicleForm.scss';
import { useEffect, useState } from 'react';
import {
  saveVehicle,
  getVehicleById,
} from '../../../utils/http-utils/vehicle-request';
import { useNavigate, useParams } from 'react-router-dom';
import {Col, Row} from 'react-bootstrap';
import * as validatorService from '../../../utils/validators/validator';

export function VehicleForm() {
  const VehicleFuelTypes = {
    ELECTRIC: 'Electric',
    HYBRID: 'Hybrid',
    PETROL: 'Petrol',
    DIESEL: 'Diesel',
  };

  const VehicleTypes = {
    ECONOMY: 'Economy',
    ESTATE: 'Estate',
    LUXURY: 'Luxury',
    SUV: 'SUV',
    CARGO: 'Cargo',
  };

  const params = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [vehicle, setVehicle] = useState({
    isActive: false,
    picture: '',
    brand: '',
    model: '',
    type: '',
    fuel: '',
    year: '',
    numberOfSeats: '',
    pricePerDay: '',
    carCount: '',
  });

  useEffect(() => {
    if (params.id) {
      getVehicleById(params.id)
        .then((vehicle) => {
        setVehicle(vehicle.data);
      });
    }
  }, [params.id]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    vehicle.year = Number(vehicle.year);
    vehicle.numberOfSeats = Number(vehicle.numberOfSeats);
    vehicle.pricePerDay = Number(vehicle.pricePerDay);
    vehicle.carCount = Number(vehicle.carCount);

    saveVehicle(vehicle).then(() => {
      navigate('/vehicles-list');
    });
  };

  const onInputChange = (event) => {
    let value = event.target.value;
    if (event.target.name === 'isActive') {
      value = event.target.checked;
    }

    setVehicle((prevState) => {
      return {
        ...prevState,
        [event.target.name]: value,
      };
    });
  };

  return (
    <div className="vehicle-form-wrapper">
      <br/>
      <div className="form">
        <Form onSubmit={onFormSubmit}>
          <Row>
            <Col>
              <h2> {vehicle.id ? 'Edit Vehicle' : 'Create Vehicle'}</h2>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Brand Name</Form.Label>
                <Form.Control
                  required
                  value={vehicle.brand}
                  type="text"
                  placeholder="Enter brand name"
                  onChange={onInputChange}
                  onBlur={(e) => validatorService.minMaxLength(e, 3, 30, setErrors, vehicle)}
                  name="brand"
                />
                {errors.brand && (
                  <span className="text-danger">
                    Brand must be between 3 and 30 characters.
                  </span>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  required
                  value={vehicle.model}
                  type="text"
                  placeholder="Enter model"
                  onChange={onInputChange}
                  onBlur={(e) => validatorService.minMaxLength(e, 3, 30, setErrors, vehicle)}
                  name="model"
                />
                {errors.model && (
                  <span className="text-danger">
                    Model must be between 3 and 30 characters.
              </span>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Picture</Form.Label>
                <Form.Control
                  required
                  value={vehicle.picture}
                  type="text"
                  onChange={onInputChange}
                  onBlur={(e) => validatorService.imageValidation(e, setErrors)}
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
                <Form.Label>Year</Form.Label>
                <Form.Control
                  required
                  value={vehicle.year}
                  onChange={onInputChange}
                  onBlur={(e) => validatorService.numberMinMaxValidation(e, 1900, 2099, setErrors)}
                  name="year"
                  type="number"
                  min="1900"
                  max="2099"
                  step="1"
                  placeholder="Enter year"
                />
                {errors.year && (
                  <span className="text-danger">
                    Year must be between 1900 and 2099.
              </span>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  required
                  aria-label="Car type"
                  placeholder="Select Car Type"
                  name="type"
                  value={vehicle.type}
                  onChange={onInputChange}
                >
                  {Object.keys(VehicleTypes).map((type) => (
                    <option key={type} value={VehicleTypes[type]}>
                      {VehicleTypes[type]}
                    </option>
                  ))}
                </Form.Select>
                {errors.type && (
                  <span className="text-danger">
                    Please choose Type, this is required.
              </span>
                )}
              </Form.Group>
            </Col>
            <Col className="mt-auto">
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Fuel type</Form.Label>
                <Form.Select
                  required
                  aria-label="Fuel type"
                  placeholder="Select Fuel Type"
                  name="fuel"
                  value={vehicle.fuel}
                  onChange={onInputChange}
                >
                  {Object.keys(VehicleFuelTypes).map((type) => (
                    <option key={type} value={VehicleFuelTypes[type]}>
                      {VehicleFuelTypes[type]}
                    </option>
                  ))}
                </Form.Select>
                {errors.fuel && (
                  <span className="text-danger">
                    Please choose Fuel, this is required.
              </span>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Number Of Seats</Form.Label>
                <Form.Control
                  required
                  value={vehicle.numberOfSeats}
                  onChange={onInputChange}
                  onBlur={(e) => validatorService.numberMinMaxValidation(e, 1, 8, setErrors)}
                  name="numberOfSeats"
                  type="number"
                  min="1"
                  max="8"
                  step="1"
                  placeholder="Enter Number Of Seats"
                />
                {errors.numberOfSeats && (
                  <span className="text-danger">
                    Number of seats must be between 1 and 8.
              </span>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Number of Cars</Form.Label>
                <Form.Control
                  required
                  value={vehicle.carCount}
                  onChange={onInputChange}
                  name="carCount"
                  type="number"
                  min="1"
                  step="0"
                  onBlur={(e) => validatorService.numberMinMaxValidation(e, 1, 999999, setErrors)}
                  placeholder="Enter Number of cars"
                />
                {errors.carCount && (
                  <span className="text-danger">
                     Minimum number of cars is 1.
              </span>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Price Per Day</Form.Label>
                <Form.Control
                  required
                  step="0.01"
                  min="1"
                  value={vehicle.pricePerDay}
                  onChange={onInputChange}
                  onBlur={(e) => validatorService.numberMinValidation(e, 1, setErrors)}
                  name="pricePerDay"
                  type="number"
                  placeholder="Enter Price Per Day"
                />
                {errors.pricePerDay && (
                  <span className="text-danger">
                    Minimum Price per day is 1$.
              </span>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Active"
                  name="isActive"
                  checked={vehicle.isActive}
                  onChange={onInputChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={!validatorService.isFormValid(errors)}>
                {vehicle.id ? 'Edit Vehicle' : 'Create Vehicle'}
              </Button>
            </Col>
          </Row>

        </Form>
      </div>
    </div>
  );
}
