import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getVehicleById,
  saveVehicle,
} from '../../../utils/http-utils/vehicle-request';
import './Rent.scss';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { getRentById, saveRent } from '../../../utils/http-utils/rent-requests';
import { orderStatus } from '../../../utils/http-utils/rent-requests';

export function Rent(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState({
    isActive: false,
    picture: '',
    brand: '',
    model: '',
    year: '',
    type: '',
    fuel: '',
    numberOfSeats: '',
    pricePerDay: '',
    id: '',
    carCount: '',
  });
  const [rent, setRent] = useState({
    id: params.id,
    userId: '',
    vehicleId: '',
    status: '',
    startDate: '',
    endDate: '',
    totalPrice: '',
  });

  useEffect(() => {
    getRentById(params.id).then((res) => setRent(res.data));
  }, [params.id]);

  useEffect(() => {
    getVehicleById(rent.vehicleId).then((res) => setVehicle(res.data));
  }, [rent.vehicleId]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (
      rent.status === orderStatus.Canceled ||
      rent.status === orderStatus.Finished
    ) {
      vehicle.carCount += 1;
    } else if (rent.status === orderStatus.InProgress) {
      vehicle.carCount -= 1;
    }

    saveVehicle(vehicle).finally(
      saveRent(rent).then(() => {
        navigate('/rents-list');
      })
    );
  };

  const onInputChange = (event) => {
    setRent((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="vehicle">
      <div className="form-vehicle">
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Rent Status</Form.Label>
            <Form.Select
              required
              aria-label="Rent Status"
              placeholder="Select Rent Status"
              name="status"
              value={rent.status}
              onChange={onInputChange}
            >
              {Object.keys(orderStatus).map((type) => (
                <option key={type} value={orderStatus[type]}>
                  {orderStatus[type]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button variant="warning" type="submit">
            Change Status
          </Button>
        </Form>
      </div>
    </div>
  );
}
