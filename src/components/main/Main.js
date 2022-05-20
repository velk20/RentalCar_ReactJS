import { VehiclesList } from '../vehicles/vehicle-list/VehiclesList';
import { Route, Routes } from 'react-router-dom';
import { Vehicle } from '../vehicles/vehicle/Vehicle';

export function Main() {
  return (
    <div className="main-content">
      <Routes>
        <Route exact path="vehicles-list" element={<VehiclesList />} />
        <Route path="/vehicle/:id" element={<Vehicle />} />
      </Routes>
    </div>
  );
}
