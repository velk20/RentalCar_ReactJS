import { useEffect, useState } from 'react';
import { getVehicleById } from '../../../utils/http-utils/vehicle-request';

export function Total({ days }) {
  const [vehicleTotal, setVehicle] = useState({});
  const currentVehicleId = window.location.href.split('/').pop();

  useEffect(() => {
    getVehicleById(currentVehicleId).then((vehicle) => {
      setVehicle(vehicle.data);
    });
  }, [currentVehicleId]);

  return (
    <div>
      <h4>{`Total price for ${days.dayCount ? days.dayCount : '0'} days = $ ${(
        days.dayCount * vehicleTotal.pricePerDay
      ).toFixed(2)}`}</h4>
    </div>
  );
}
