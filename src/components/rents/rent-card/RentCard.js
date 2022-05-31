import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './RentCard.scss';
import { VehicleCard } from '../../vehicles/vehicle-card/VehicleCard';
import { getVehicleById } from '../../../utils/http-utils/vehicle-request';
import { useEffect, useState } from 'react';
import { orderStatus } from '../../../utils/http-utils/rent-requests';

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
          <VehicleCard key={rent.vehicleId} vehicle={vehicle} />
        </div>

        {rent.status === orderStatus.InProgress && (
          <p style={{ color: 'blue', fontWeight: 'bold' }}>In Progress</p>
        )}

        {rent.status === orderStatus.Canceled && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>Canceled</p>
        )}

        {rent.status === orderStatus.Finished && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>Finished</p>
        )}
        <div className="btn-holder">
          <Button variant="danger" onClick={() => deleteRent(rent.id)}>
            Delete
          </Button>
        </div>
        <div>
          <Button variant="warning" onClick={redirectToEdit}>
            Change Rent
          </Button>
        </div>
      </div>
    </div>
  );
}
