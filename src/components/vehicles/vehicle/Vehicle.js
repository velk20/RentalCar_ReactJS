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

export function Vehicle(props) {
  const params = useParams();
  const loggedUser = getLoggedUser();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);

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

  const onFormSubmit = (event) => {
    event.preventDefault();
    rent.userId = loggedUser.id;
    rent.vehicleId = vehicle.id;
    rent.status = orderStatus.InProgress;

    vehicle.carCount -= 1;

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

          <Button variant="warning" type="submit">
            Rent Car
          </Button>
        </Form>
      </div>
    </div>
  );
}
