import { useEffect, useState } from 'react';
import {
  deleteVehicleById,
  getAllVehicles,
} from '../../../utils/http-utils/vehicle-request';
import { VehicleCard } from '../vehicle-card/VehicleCard';
import './VehiclesList.scss';
import { getLoggedUser } from '../../../utils/http-utils/user-request';

export function VehiclesList() {
  const [vehicles, setVehicles] = useState([]);
  const loggedUser = getLoggedUser();

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
        //getting all data for ADMINS only
        loggedUser.isAdmin &&
          vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              deleteVehicle={deleteVehicleHandler}
            />
          ))
      }

      {
        //getting all data for users

        !loggedUser.isAdmin &&
          vehicles
            .filter((vehicle) => vehicle.isActive)
            .map((vehicle) => (
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
