import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Register } from './components/auth/register/Register';
import { Layout } from './components/layout/Layout';
import { VehiclesList } from './components/vehicles/vehicle-list/VehiclesList';
import { Vehicle } from './components/vehicles/vehicle/Vehicle';
import { User } from './components/users/user/User';
import { UserForm } from './components/users/user-form/UserForm';
import { UsersList } from './components/users/user-list/UsersList';
import { Login } from './components/auth/login/Login';
import { AuthenticatedRoute } from './utils/guards/AuthenticatedRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Layout />}>
          <Route
            exact
            path="vehicles-list"
            element={
              <AuthenticatedRoute>
                <VehiclesList />
              </AuthenticatedRoute>
            }
          />
          <Route path="/vehicle/:id" element={<Vehicle />} />
          <Route exact path="users-list" element={<UsersList />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/user/create" element={<UserForm />} />
          <Route path="/user/edit/:id" element={<UserForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
