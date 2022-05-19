import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './VehicleCard.scss';

export function VehicleCard({ user }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src="https://img.autoabc.lv/Lexus-ES/Lexus-ES_2006_Sedans_1641210554_3.jpg"
      />
      <Card.Body>
        <Card.Title>Vehicle Brand and Model</Card.Title>
        <Card.Text>
          <span className="key">Year: </span>
          <span className="value">2012</span>
        </Card.Text>
        <Card.Text>
          <span className="key">Type: </span>
          <span className="value">Van</span>
        </Card.Text>
        <Card.Text>
          <span className="key">Fuel: </span>
          <span className="value">Petrol</span>
        </Card.Text>
        <Card.Text>
          <span className="key">Number of seats: </span>
          <span className="value">5</span>
        </Card.Text>
        <div className="btn-holder">
          <Button variant="primary">Edit</Button>
          <Button variant="danger">Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
