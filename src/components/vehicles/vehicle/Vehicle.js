import {Fragment, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getVehicleById,
  saveVehicle,
} from '../../../utils/http-utils/vehicle-request';
import { VehicleCard } from '../vehicle-card/VehicleCard';
import './Vehicle.scss';
import { Form } from 'react-bootstrap';
import {
  getLoggedUser,
  saveUser, updateUser,
} from '../../../utils/http-utils/user-request';
import { Button } from 'react-bootstrap';
import { saveRent } from '../../../utils/http-utils/rent-requests';
import { orderStatus } from '../../../utils/http-utils/rent-requests';
import { Total } from './Total';
import { getUserById } from '../../../utils/http-utils/user-request';

export function Vehicle(props) {
  const params = useParams();
  const loggedUser = getLoggedUser();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState({ pricePerDay: '' });
  const [finalPrice, setFinalPrice] = useState('');

  const [user, setUser] = useState({
    isAdmin: false,
    name: '',
    picture: '',
    email: '',
    phone: '',
    address: '',
    isVIP: false,
    totalRentedCars: 0,
  });

  const [rent, setRent] = useState({
    id: '',
    userId: '',
    vehicleId: '',
    status: '',
    startDate: '',
    endDate: '',
    totalPrice: '',
  });


  useEffect(() => {
    if (loggedUser.id) {
      getUserById(loggedUser.id).then((user) => {
        setUser(user.data);
      });
    }
  }, [loggedUser.id]);

  useEffect(() => {
    getVehicleById(params.id).then((res) => setVehicle(res.data));
  }, [params.id]);

  function getDifferenceInDays(date1, date2) {
    let currentDate = new Date();
    if (date1 < currentDate.setDate(currentDate.getDate() - 1)) {
      return -1;
    }
    if (date1 >  date2){
      return 0;
    }
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  function passData(data) {
    setFinalPrice(data);
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    rent.userId = loggedUser.id;
    rent.vehicleId = vehicle.id;
    rent.status = orderStatus.WaitingConfirm;
    rent.totalPrice = Number(finalPrice);
    user.totalRentedCars = user.totalRentedCars + 1;
    if (user.totalRentedCars >= 3) {
      user.isVIP = true;
    }

    saveVehicle(vehicle)
      .then(()=>{
        updateUser(user)
          .then(()=>{
            saveRent(rent)
              .then(() => {
                navigate('/rents-list');
              })
          }
        )
      }
    );
  };

  const onInputChange = (event) => {
    setRent((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="vehicle-wrapper" >
      <div className="vehicle">
        <div className="form-vehicle">
          <div className="vehicleCard">
            <VehicleCard vehicle={vehicle} />
          </div>
          <Form onSubmit={onFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                id={"startDate"}
                required
                type="date"
                placeholder="Enter Due date"
                name="startDate"
                value={rent.startDate}
                onChange={onInputChange}
                min={new Date().toJSON().slice(0, 10)}
                max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toJSON().slice(0, 10)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                id={"endDate"}
                required
                type="date"
                placeholder="Enter Due date"
                name="endDate"
                value={rent.endDate}
                onChange={onInputChange}
                min={new Date(Date.now() + 24*60*60*1000).toJSON().slice(0, 10)}
                max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toJSON().slice(0, 10)}
              />
            </Form.Group>

            {rent.startDate
              && rent.endDate
              && (
                <Total
                  days={{
                    dayCount: getDifferenceInDays(
                      new Date(rent.startDate),
                      new Date(rent.endDate)
                    ),
                  }}
                  passData={passData}
                />
              )}

            <br></br>
            <Button variant="warning" type="submit"
                    disabled={
                      !rent.startDate
                      || !rent.endDate
                      || getDifferenceInDays(
                        new Date(rent.startDate),
                        new Date(rent.endDate)
                      ) <=  0
                      || Number(vehicle.carCount) <= 0}>
              Rent Car {Number(vehicle.carCount) <= 0 ? 'is not possible! No cars of this model are free' : ''}
            </Button>
          </Form>
        </div>
      </div>
    </div>

  );
}
