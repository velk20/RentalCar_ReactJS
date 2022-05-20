import { useEffect, useState } from 'react';
import {
  deleteVehicleById,
  getAllVehicles,
} from '../../../utils/http-utils/user-request';
import { VehicleCard } from '../vehicle-card/VehicleCard';
import './VehiclesList.scss';

export function VehiclesList() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getAllVehicles().then((response) => {
      setVehicles(response.data); //get all vehicles data and add them to array with setVehicles
    });
  }, []); //only one time will execute when empty array

  const deleteVehicleHandler = async (id) => {
    await deleteVehicleById(id);
    setVehicles((prevState) => {
      return prevState.filter((vehicle) => vehicle.id !== id);
    });
  };

  return (
    <div className="vehicles-list-wrapper">
      {
        //getting all data
        vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            deleteVehicle={deleteVehicleHandler}
          />
        ))
      }
    </div>
  );
}
