import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getVehicleById,
  saveVehicle,
} from '../../../utils/http-utils/vehicle-request';
import { VehicleCard } from '../vehicle-card/VehicleCard';
import './Vehicle.scss';
import { Form } from 'react-bootstrap';
import { getLoggedUser } from '../../../utils/http-utils/user-request';
import { Button } from 'react-bootstrap';
import { saveRent } from '../../../utils/http-utils/rent-requests';
import { orderStatus } from '../../../utils/http-utils/rent-requests';
import { Total } from './Total';

export function Vehicle(props) {
  const params = useParams();
  const loggedUser = getLoggedUser();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState({ pricePerDay: '' });
  const [days, setDays] = useState({
    dayCount: '',
  });
  const [rent, setRent] = useState({
    id: '',
    userId: '',
    vehicleId: '',
    status: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    getVehicleById(params.id).then((res) => setVehicle(res.data));
  }, [params.id]);

  function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    rent.userId = loggedUser.id;
    rent.vehicleId = vehicle.id;
    rent.status = orderStatus.WaitingConfirm;

    saveVehicle(vehicle).finally(
      saveRent(rent).then(() => {
        navigate('/vehicles-list');
      })
    );
  };

  const onInputChange = (event) => {
    setRent((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

    setDays((prevState) => ({
      ...prevState,
      dayCount: getDifferenceInDays(
        new Date(rent.startDate),
        new Date(rent.endDate)
      ),
    }));
  };

  return (
    <div className="vehicle">
      <div className="form-vehicle">
        <div className="vehicleCard">
          <VehicleCard vehicle={vehicle} />
        </div>
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              required
              type="date"
              placeholder="Enter Due date"
              name="startDate"
              value={rent.startDate}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              required
              type="date"
              placeholder="Enter Due date"
              name="endDate"
              value={rent.endDate}
              onChange={onInputChange}
            />
          </Form.Group>

          <Total days={days} vehicle={vehicle} />
          <Button variant="warning" type="submit">
            Rent Car
          </Button>
        </Form>
      </div>
    </div>
  );
}
