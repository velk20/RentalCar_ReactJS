import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './VehicleCard.scss';

export function VehicleCard({ vehicle }) {
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
          <Button variant="primary">Edit</Button>
          <Button variant="danger">Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
