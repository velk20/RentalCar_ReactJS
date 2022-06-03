import { useEffect, useState } from 'react';
import { getVehicleById } from '../../../utils/http-utils/vehicle-request';
import { getLoggedUser } from '../../../utils/http-utils/user-request';

export function Total({ days, passData }) {
  const [vehicleTotal, setVehicle] = useState({});
  const currentVehicleId = window.location.href.split('/').pop();
  const loggedUser = getLoggedUser();
  let discount = 0;

  useEffect(() => {
    getVehicleById(currentVehicleId).then((vehicle) => {
      setVehicle(vehicle.data);
    });
  }, [currentVehicleId]);

  function calculateTotalPrice({ days }, discount) {
    const totalWithoutDiscount = (
      days.dayCount * vehicleTotal.pricePerDay
    ).toFixed(2);
    const withDiscount = (
      (days.dayCount * vehicleTotal.pricePerDay * discount) /
      100
    ).toFixed(2);

    const total = (totalWithoutDiscount - withDiscount).toFixed(2);

    passData(total);

    return (
      <h4>
        {`Total: $${totalWithoutDiscount} - $${
          withDiscount > 0 ? withDiscount : ''
        } = $${total}`}
      </h4>
    );
  }

  function checkForDiscount(countOfDays) {
    if (loggedUser.isVIP) {
      discount = 15;
      return <h5>Discount: -15% for VIP</h5>;
    } else if (countOfDays >= 3 && countOfDays <= 5 && !loggedUser.isVIP) {
      discount = 5;
      return <h5>Discount: -5% for more than 3 days</h5>;
    } else if (countOfDays > 5 && countOfDays <= 10 && !loggedUser.isVIP) {
      discount = 7;
      return <h5>Discount: -7% for more than 5 days</h5>;
    } else if (countOfDays > 10 && !loggedUser.isVIP) {
      discount = 10;
      return <h5>Discount: -10% for more than 10 days</h5>;
    }
  }

  return (
    <div>
      <h4>{`Price for ${days.dayCount ? days.dayCount : '0'} days`}</h4>

      {checkForDiscount(days.dayCount)}
      {calculateTotalPrice({ days }, discount)}
    </div>
  );
}
