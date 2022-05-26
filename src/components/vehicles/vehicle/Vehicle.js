import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVehicleById } from '../../../utils/http-utils/vehicle-request';
import { VehicleCard } from '../vehicle-card/VehicleCard';
import './Vehicle.scss';

export function Vehicle(props) {
  const params = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    getVehicleById(params.id).then((res) => setVehicle(res.data));
  }, [params.id]);
  return (
    <div className="vehicle">
      <div>
        <VehicleCard vehicle={vehicle} />
      </div>
    </div>
  );
}