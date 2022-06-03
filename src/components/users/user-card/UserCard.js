import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './UserCard.scss';
import { getLoggedUser } from '../../../utils/http-utils/user-request';
import { getAllRents } from '../../../utils/http-utils/rent-requests';
import { useEffect, useState } from 'react';

export function UserCard({ user, deleteUser }) {
  const loggedUser = getLoggedUser();
  const navigate = useNavigate();
  const url = window.location.href.split('/').pop();
  const [rents, setRents] = useState([]);

  useEffect(() => {
    getAllRents().then((response) => {
      setRents(response.data);
    });
  }, []);

  const redirectToDetails = () => {
    navigate(`/user/${user.id}`);
  };

  const redirectToEdit = () => {
    navigate(`/user/edit/${user.id}`);
  };

  if (!user) {
    return <h1 style={{ margin: '20px' }}>No Users!</h1>;
  }

  return (
    <Card style={{ width: '18rem' }}>
      {url !== 'rents-list' && <Card.Img variant="top" src={user.picture} />}
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Text>
          <span className="key">Address: </span>
          <span className="value">{user.address}</span>
        </Card.Text>
        <Card.Text>
          <span className="key">Email: </span>
          <span className="value">{user.email}</span>
        </Card.Text>
        <Card.Text>
          <span className="key">Phone: </span>
          <span className="value">{user.phone}</span>
        </Card.Text>

        <Card.Text>
          <span className="key">Cars Rented: </span>
          <span className="value">{user.totalRentedCars}</span>
        </Card.Text>

        {loggedUser.isAdmin && (
          <Card.Text>
            <span className="key">isAdmin: </span>
            <span className="value">
              {user.isAdmin ? (
                <span style={{ color: 'green', fontWeight: 'bold' }}>Yes</span>
              ) : (
                <span style={{ color: 'red', fontWeight: 'bold' }}>No</span>
              )}
            </span>
          </Card.Text>
        )}

        {loggedUser.isAdmin && (
          <Card.Text>
            <span className="key">isVIP: </span>
            <span className="value">
              {user.isVIP ? (
                <span style={{ color: 'green', fontWeight: 'bold' }}>Yes</span>
              ) : (
                <span style={{ color: 'red', fontWeight: 'bold' }}>No</span>
              )}
            </span>
          </Card.Text>
        )}

        {url !== 'rents-list' && (
          <div className="btn-holder">
            {loggedUser.isAdmin && (
              <Button variant="primary" onClick={redirectToEdit}>
                Edit
              </Button>
            )}

            {loggedUser.isAdmin && loggedUser.id !== user.id && (
              <Button variant="danger" onClick={() => deleteUser(user.id)}>
                Delete
              </Button>
            )}

            <Button variant="info" onClick={redirectToDetails}>
              Details
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
