import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Fetching activities from:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        console.log('Activities response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Activities data received:', data);
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log('Processed activities data:', activitiesData);
        setActivities(activitiesData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-5"><div className="alert alert-info text-center" role="alert"><div className="spinner-border text-primary me-2" role="status"><span className="visually-hidden">Loading...</span></div>Loading activities...</div></div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger" role="alert"><strong>Error!</strong> {error}</div></div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4">🏃 Activities</h1>
        <div>
          <span className="badge bg-primary rounded-pill fs-6 me-2">{activities.length} Total</span>
          <button className="btn btn-success">+ Log Activity</button>
        </div>
      </div>
      <div className="card shadow-lg">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Activity Type</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map(activity => (
                  <tr key={activity.id}>
                    <td><strong>{activity.user_username}</strong></td>
                    <td><span className="badge bg-primary">{activity.activity_type}</span></td>
                    <td><span className="badge bg-info text-dark">{activity.duration} min</span></td>
                    <td><span className="badge bg-warning text-dark">{activity.calories_burned} cal</span></td>
                    <td>{new Date(activity.date).toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-info me-1">Edit</button>
                      <button className="btn btn-sm btn-outline-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;
