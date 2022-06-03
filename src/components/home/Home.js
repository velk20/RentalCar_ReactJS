import './Home.scss';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  const toAllVehicles = () => {
    navigate('/vehicles-list');
  };

  return (
    <div className="wrapper">
      <div className="text-center hero-text">
        <h1>Best Rental Car Web Site</h1>
        <h3>Explore a new world with our cars </h3>
        <Button variant="primary" onClick={toAllVehicles}>
          Explore Our Cars
        </Button>
      </div>
    </div>
  );
}
