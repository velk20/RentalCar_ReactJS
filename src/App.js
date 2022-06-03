import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Register } from './components/auth/register/Register';
import { Layout } from './components/layout/Layout';
import { VehiclesList } from './components/vehicles/vehicle-list/VehiclesList';
import { Vehicle } from './components/vehicles/vehicle/Vehicle';
import { VehicleForm } from './components/vehicles/vehicle-form/VehicleForm';
import { User } from './components/users/user/User';
import { UserForm } from './components/users/user-form/UserForm';
import { UsersList } from './components/users/user-list/UsersList';
import { Login } from './components/auth/login/Login';
import { AuthenticatedRoute } from './utils/guards/AuthenticatedRoute';
import { NonAuthenticatedRoute } from './utils/guards/NonAuthenticatedRoute';
import { AdminRoute } from './utils/guards/AdminRoute';
import { RentList } from './components/rents/rent-list/RentList';
import { Rent } from './components/rents/rent/Rent';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/register"
          element={
            <NonAuthenticatedRoute>
              <Register />
            </NonAuthenticatedRoute>
          }
        />

        <Route
          exact
          path="/login"
          element={
            <NonAuthenticatedRoute>
              <Login />
            </NonAuthenticatedRoute>
          }
        />

        <Route
          exact
          path="/"
          element={
            <AuthenticatedRoute>
              <Layout />
            </AuthenticatedRoute>
          }
        >
          <Route exact path="/vehicles-list" element={<VehiclesList />} />
          <Route exact path="/rents-list" element={<RentList />} />
          <Route
            path="/rent/edit/:id"
            element={
              <AdminRoute>
                <Rent />
              </AdminRoute>
            }
          />

          <Route path="/vehicle/:id" element={<Vehicle />} />

          <Route
            exact
            path="/vehicle/create"
            element={
              <AdminRoute>
                <VehicleForm />
              </AdminRoute>
            }
          />

          <Route
            path="/vehicle/edit/:id"
            element={
              <AdminRoute>
                <VehicleForm />
              </AdminRoute>
            }
          />

          <Route
            exact
            path="users-list"
            element={
              <AdminRoute>
                <UsersList />
              </AdminRoute>
            }
          />

          <Route path="/user/:id" element={<User />} />

          <Route
            exact
            path="/user/create"
            element={
              <AdminRoute>
                <UserForm />
              </AdminRoute>
            }
          />

          <Route
            path="/user/edit/:id"
            element={
              <AdminRoute>
                <UserForm />
              </AdminRoute>
            }
          />

          <Route
            path="/user/editUser/:id"
            element={
              <AdminRoute>
                <UserForm />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
