import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './VehicleCard.scss';
import { getLoggedUser } from '../../../utils/http-utils/user-request';

export function VehicleCard({ vehicle, deleteVehicle }) {
  const loggedUser = getLoggedUser();
  const navigate = useNavigate();
  const currentVehicleId = window.location.href.split('/').pop();

  const redirectToDetails = () => {
    navigate(`/vehicle/${vehicle.id}`);
  };

  const redirectToEdit = () => {
    navigate(`/vehicle/edit/${vehicle.id}`);
  };

  if (!vehicle) {
    return <h1 style={{ margin: '20px' }}>No Vehicle!</h1>;
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={vehicle.picture} />
      <Card.Body>
        <Card.Title>{`${vehicle.brand} ${vehicle.model}`}</Card.Title>
        <Card.Text>
          <span className="key">Year: </span>
          <span className="value">{vehicle.year}</span>
        </Card.Text>
        <Card.Text>
          <span className="key">Type: </span>
          <span className="value">{vehicle.type}</span>
        </Card.Text>
        <Card.Text>
          <span className="key">Fuel: </span>
          <span className="value">{vehicle.fuel}</span>
        </Card.Text>
        <Card.Text>
          <span className="key">Number of seats: </span>
          <span className="value">{vehicle.numberOfSeats}</span>
        </Card.Text>
        <Card.Text>
          <span className="key">Number of cars: </span>
          <span className="value">
            {Number(vehicle.carCount) ? (
              vehicle.carCount
            ) : (
              <span style={{ color: 'red', fontWeight: 'bold' }}>No Cars</span>
            )}
          </span>
        </Card.Text>
        <Card.Text>
          <span className="key">Price per day: </span>
          <span className="value">${vehicle.pricePerDay}</span>
        </Card.Text>
        {loggedUser.isAdmin && (
          <Card.Text>
            <span className="key">isActive: </span>
            <span className="value">
              {vehicle.isActive ? (
                <span style={{ color: 'green', fontWeight: 'bold' }}>Yes</span>
              ) : (
                <span style={{ color: 'red', fontWeight: 'bold' }}>No</span>
              )}
            </span>
          </Card.Text>
        )}
        <div className="btn-holder">
          {currentVehicleId !== vehicle.id &&
            currentVehicleId !== 'rents-list' &&
            loggedUser.isAdmin && (
              <Button variant="primary" onClick={redirectToEdit}>
                Edit
              </Button>
            )}

          {currentVehicleId !== vehicle.id &&
            currentVehicleId !== 'rents-list' &&
            loggedUser.isAdmin && (
              <Button
                variant="danger"
                onClick={() => deleteVehicle(vehicle.id)}
              >
                Delete
              </Button>
            )}

          {currentVehicleId !== vehicle.id &&
            currentVehicleId !== 'rents-list' && (
              <div>
                <Button variant="warning" onClick={redirectToDetails}>
                  Rent
                </Button>
              </div>
            )}
        </div>
      </Card.Body>
    </Card>
  );
}
