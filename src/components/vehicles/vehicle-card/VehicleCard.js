export function VehicleCard({ user }) {
  return (
    <div className="vehicle-card">
      <div className="card-header">
        <h4>Angel Mladenov</h4>
      </div>
      <div className="card-body">
        <img src="dsa.png" alt="vehicle-image" />
      </div>
      <div className="card-footer">
        <button className="edit-btn">Edit</button>
        <button className="delete-btn">Delete</button>
      </div>
    </div>
  );
}
