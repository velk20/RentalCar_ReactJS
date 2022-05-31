import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './RentCard.scss';
import { VehicleCard } from '../../vehicles/vehicle-card/VehicleCard';
import { getVehicleById } from '../../../utils/http-utils/vehicle-request';
import { useEffect, useState } from 'react';

export function RentCard({ rent, deleteRent }) {
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    getVehicleById(rent.vehicleId).then((res) => setVehicle(res.data));
  }, [rent.vehicleId]);

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
          {console.log(getVehicleById(rent.vehicleId).then((e) => e.data))}
          <VehicleCard key={rent.vehicleId} vehicle={vehicle} />
        </div>
        <div className="btn-holder">
          <Button variant="danger" onClick={() => deleteRent(rent.id)}>
            Delete
          </Button>
        </div>
        <div>
          <Button variant="warning" onClick={redirectToEdit}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
