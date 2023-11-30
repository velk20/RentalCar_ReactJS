import {
  deleteRentById,
  getAllRents, orderStatus, saveRent,
} from '../../../utils/http-utils/rent-requests';
import { useEffect, useState } from 'react';
import { RentCard } from '../rent-card/RentCard';
import './RentList.scss';
import { getLoggedUser } from '../../../utils/http-utils/user-request';
import { useNavigate } from 'react-router-dom';
import {NoRent} from "../no-rent/NoRent";

export function RentList() {
  const [rents, setRents] = useState([]);
  const navigate = useNavigate();
  const loggedUser = getLoggedUser();

  useEffect(() => {
    getAllRents()
      .then((response) => {
        let rents = response.data
        for (const rent of rents) {
          if (new Date(rent.endDate) < new Date() && rent.status !== orderStatus.Finished){
            rent.status = orderStatus.Finished;

            saveRent(rent)
              .then((res) => {
                console.log(res.data);
              })
          }
        }

        if (!loggedUser.isAdmin){
          rents = rents.filter((rent) => rent.userId === loggedUser.id)
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


  return (
  <>
    {rents.length > 0
        ? (
            <div className="rents-list-wrapper">
              {rents.map(
                (rent) => (
                  <RentCard key={rent.id} rent={rent} deleteRent={deleteRentHandler} />
                ))}
            </div>
           )
        : (<NoRent toAllVehicles={toAllVehicles}/>)
    }
  </>
  );
}
