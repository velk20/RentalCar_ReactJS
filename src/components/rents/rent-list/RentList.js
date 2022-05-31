import {
  deleteRentById,
  getAllRents,
} from '../../../utils/http-utils/rent-requests';
import { useEffect, useState } from 'react';
import { RentCard } from '../rent-card/RentCard';
import './RentList.scss';

export function RentList() {
  const [rents, setRents] = useState([]);

  useEffect(() => {
    getAllRents().then((response) => {
      setRents(response.data);
    });
  }, []);

  const deleteRentHandler = async (id) => {
    await deleteRentById(id);
    setRents((prevState) => {
      return prevState.filter((rent) => rent.id !== id);
    });
  };

  return (
    <div className="rents-list-wrapper">
      {rents.map((rent) => (
        <RentCard key={rent.id} rent={rent} deleteRent={deleteRentHandler} />
      ))}
    </div>
  );
}
