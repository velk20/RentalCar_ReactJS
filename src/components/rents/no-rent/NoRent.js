import {Button} from "react-bootstrap";

export const NoRent = (toAllVehicles) => {
  return (
      <div style={{ margin: '20px' }}>
          <h1>No Rents!</h1>
          <Button variant="primary" onClick={toAllVehicles}>
              Explore Our Cars
          </Button>
      </div>
  )
}