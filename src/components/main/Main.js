import { VehiclesList } from '../vehicles/vehicle-list/VehiclesList';
import { Route, Routes } from 'react-router-dom';
import { Vehicle } from '../vehicles/vehicle/Vehicle';
import { UsersList } from '../users/user-list/UsersList';
import { User } from '../users/user/User';
import { UserForm } from '../users/user-form/UserForm';
import { VehicleForm } from '../vehicles/vehicle-form/VehicleForm';
import { Home } from '../home/Home';
import { RentList } from '../rents/rent-list/RentList';
import { Rent } from '../rents/rent/Rent';

export function Main() {
  return (
    <div className="main-content">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/vehicles-list" element={<VehiclesList />} />
        <Route path="/vehicle/:id" element={<Vehicle />} />
        <Route path="/vehicle/create" element={<VehicleForm />} />
        <Route path="/vehicle/edit/:id" element={<VehicleForm />} />

        <Route exact path="/users-list" element={<UsersList />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/user/create" element={<UserForm />} />
        <Route path="/user/edit/:id" element={<UserForm />} />
        <Route path="/user/editUser/:id" element={<UserForm />} />

        <Route exact path="/rents-list" element={<RentList />} />
        <Route path="/rent/edit/:id" element={<Rent />} />
      </Routes>
    </div>
  );
}
