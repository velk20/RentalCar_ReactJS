import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './VehicleCard.scss';
import { getLoggedUser } from '../../../utils/http-utils/user-request';

export function VehicleCard({ vehicle, deleteVehicle }) {
  const loggedUser = getLoggedUser();
  const navigate = useNavigate();
  const redirectToDetails = () => {
    navigate(`/vehicle/${vehicle.id}`);
  };

  const redirectToEdit = () => {
    navigate(`/vehicle/edit/${vehicle.id}`);
  };

  if (!vehicle) {
    return <p>No Vehicle!</p>;
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
        <div className="btn-holder">
          {loggedUser.isAdmin && (
            <Button variant="primary" onClick={redirectToEdit}>
              Edit
            </Button>
          )}

          {loggedUser.isAdmin && (
            <Button variant="danger" onClick={() => deleteVehicle(vehicle.id)}>
              Delete
            </Button>
          )}

          <Button variant="info" onClick={redirectToDetails}>
            Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
