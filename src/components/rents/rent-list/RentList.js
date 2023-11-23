import {
  deleteRentById,
  getAllRents, orderStatus, saveRent,
} from '../../../utils/http-utils/rent-requests';
import { useEffect, useState } from 'react';
import { RentCard } from '../rent-card/RentCard';
import './RentList.scss';
import { getLoggedUser } from '../../../utils/http-utils/user-request';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function RentList() {
  const [rents, setRents] = useState([]);
  const navigate = useNavigate();
  const loggedUser = getLoggedUser();

  useEffect(() => {
    getAllRents()
      .then((response) => {
        const rents = response.data
        for (const rent of rents) {
          if (new Date(rent.endDate) < new Date()){
            rent.status = orderStatus.Finished;
          }

          saveRent(rent)
            .then((res) => {
              console.log(res.data);
            })
        }
      setRents(rents);
    });

  }, []);

  const toAllVehicles = () => {
    navigate('/vehicles-list');
  };

  const deleteRentHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this rent info?")) {
      await deleteRentById(id);
      setRents((prevState) => {
        return prevState.filter((rent) => rent.id !== id);
      });
    }
  };

  if (rents.filter((rent) => rent.userId === loggedUser.id).length === 0) {
    return (
      <div style={{ margin: '20px' }}>
        <h1>No Rents!</h1>
        <Button variant="primary" onClick={toAllVehicles}>
          Explore Our Cars
        </Button>
      </div>
    );
  }
  return (
    <div className="rents-list-wrapper">
      {loggedUser.isAdmin &&
        rents.map((rent) => (
          <RentCard key={rent.id} rent={rent} deleteRent={deleteRentHandler} />
        ))}

      {!loggedUser.isAdmin &&
        rents
          .filter((rent) => rent.userId === loggedUser.id)
          .map((rent) => (
            <RentCard
              key={rent.id}
              rent={rent}
              deleteRent={deleteRentHandler}
            />
          ))}
    </div>
  );
}
