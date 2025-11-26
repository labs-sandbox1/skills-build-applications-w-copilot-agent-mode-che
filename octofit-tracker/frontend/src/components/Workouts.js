import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Fetching workouts from:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        console.log('Workouts response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts data received:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Processed workouts data:', workoutsData);
        setWorkouts(workoutsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-5"><div className="alert alert-info text-center" role="alert"><div className="spinner-border text-primary me-2" role="status"><span className="visually-hidden">Loading...</span></div>Loading workouts...</div></div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger" role="alert"><strong>Error!</strong> {error}</div></div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4">💪 Workout Suggestions</h1>
        <span className="badge bg-primary rounded-pill fs-6">{workouts.length} Workouts</span>
      </div>
      <div className="row">
        {workouts.map(workout => (
          <div key={workout.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-lg">
              <div className="card-header bg-gradient text-white">
                <h5 className="mb-0 text-dark">💪 {workout.name}</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <span className="badge bg-info text-dark me-2">{workout.workout_type}</span>
                  <span className="badge bg-warning text-dark">{workout.difficulty}</span>
                </div>
                <p className="card-text"><strong>Duration:</strong> <span className="badge bg-success">{workout.duration} minutes</span></p>
                <p className="card-text text-muted">{workout.description}</p>
              </div>
              <div className="card-footer bg-transparent border-top-0">
                <button className="btn btn-primary w-100">Start Workout</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
