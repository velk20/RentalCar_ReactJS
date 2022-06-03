import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './RentCard.scss';
import { VehicleCard } from '../../vehicles/vehicle-card/VehicleCard';
import {
  getVehicleById,
  saveVehicle,
} from '../../../utils/http-utils/vehicle-request';
import { useEffect, useState } from 'react';
import { orderStatus } from '../../../utils/http-utils/rent-requests';
import {
  getLoggedUser,
  getUserById,
} from '../../../utils/http-utils/user-request';
import { Form } from 'react-bootstrap';
import { UserCard } from '../../users/user-card/UserCard';

export function RentCard({ rent, deleteRent }) {
  const navigate = useNavigate();
  const loggedUser = getLoggedUser();
  const [vehicle, setVehicle] = useState(null);
  const [user, setUser] = useState({
    id: '',
    isAdmin: false,
    picture: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    isVIP: false,
    totalRentedCars: 0,
  });

  useEffect(() => {
    getVehicleById(rent.vehicleId).then((res) => setVehicle(res.data));
  }, [rent.vehicleId]);

  useEffect(() => {
    getUserById(rent.userId).then((res) => setUser(res.data));
  }, [rent.userId]);

  const redirectToEdit = () => {
    navigate(`/rent/edit/${rent.id}`);
  };

  if (!rent) {
    return <p>No Rents!</p>;
  }

  return (
    <div className="rent-card-wrapper">
      <div className="form-vehicle">
        <div className="vehicleCard">
          <div>
            <h3>Rented Car:</h3>
            <VehicleCard key={rent.vehicleId} vehicle={vehicle} />
          </div>
          <div className="rental-user">
            <h3>Rental User:</h3>
            <UserCard key={user.id} user={user} />
            <div className="rent-date">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  disabled
                  required
                  type="date"
                  placeholder="Enter Due date"
                  name="startDate"
                  value={rent.startDate}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  disabled
                  required
                  type="date"
                  placeholder="Enter Due date"
                  name="endDate"
                  value={rent.endDate}
                />
              </Form.Group>
            </div>
            <div>
              <h3>{`Total price: $ ${rent.totalPrice}`}</h3>
              {!loggedUser.isAdmin &&
                rent.status === orderStatus.WaitingConfirm && (
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteRent(rent.id);
                      vehicle.carCount += 1;
                      saveVehicle(vehicle).then(navigate('/vehicles-list'));
                    }}
                  >
                    Cancel Rent
                  </Button>
                )}
            </div>
          </div>
        </div>

        <h4>
          Status:{' '}
          {rent.status === orderStatus.InProgress && (
            <p style={{ color: 'blue', fontWeight: 'bold' }}>
              {orderStatus.InProgress}
            </p>
          )}
          {rent.status === orderStatus.Canceled && (
            <p style={{ color: 'red', fontWeight: 'bold' }}>
              {orderStatus.Canceled}
            </p>
          )}
          {rent.status === orderStatus.Finished && (
            <p style={{ color: 'green', fontWeight: 'bold' }}>
              {orderStatus.Finished}
            </p>
          )}
          {rent.status === orderStatus.WaitingConfirm && (
            <p style={{ color: 'orange', fontWeight: 'bold' }}>
              {orderStatus.WaitingConfirm}
            </p>
          )}
        </h4>

        <div className="btn-holder">
          {loggedUser.isAdmin && (
            <Button
              variant="danger"
              onClick={() => {
                deleteRent(rent.id);
                vehicle.carCount += 1;
                saveVehicle(vehicle).then(navigate('/rents-list'));
              }}
            >
              Delete
            </Button>
          )}
        </div>
        <div>
          {loggedUser.isAdmin && (
            <Button variant="warning" onClick={redirectToEdit}>
              Change Status
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
