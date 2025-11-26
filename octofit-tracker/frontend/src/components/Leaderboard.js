import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Fetching leaderboard from:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        console.log('Leaderboard response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard data received:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Processed leaderboard data:', leaderboardData);
        setLeaderboard(leaderboardData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-5"><div className="alert alert-info text-center" role="alert"><div className="spinner-border text-primary me-2" role="status"><span className="visually-hidden">Loading...</span></div>Loading leaderboard...</div></div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger" role="alert"><strong>Error!</strong> {error}</div></div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4">🏆 Leaderboard</h1>
        <span className="badge bg-primary rounded-pill fs-6">{leaderboard.length} Competitors</span>
      </div>
      <div className="card shadow-lg">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col" className="text-center">Rank</th>
                  <th scope="col">User</th>
                  <th scope="col">Team</th>
                  <th scope="col" className="text-center">Activities</th>
                  <th scope="col" className="text-center">Duration</th>
                  <th scope="col" className="text-center">Calories</th>
                  <th scope="col" className="text-center">Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.user_id || index} className={index < 3 ? 'table-warning' : ''}>
                    <td className="text-center">
                      <strong className="fs-5">
                        {index === 0 && '🥇'}
                        {index === 1 && '🥈'}
                        {index === 2 && '🥉'}
                        {index > 2 && <span className="badge bg-secondary">#{index + 1}</span>}
                      </strong>
                    </td>
                    <td><strong className="text-primary">{entry.user_username}</strong></td>
                    <td>{entry.team_name ? <span className="badge bg-success">{entry.team_name}</span> : <span className="badge bg-secondary">No Team</span>}</td>
                    <td className="text-center"><span className="badge bg-info text-dark">{entry.total_activities}</span></td>
                    <td className="text-center"><span className="badge bg-primary">{entry.total_duration} min</span></td>
                    <td className="text-center"><span className="badge bg-warning text-dark">{entry.total_calories} cal</span></td>
                    <td className="text-center"><strong className="fs-5 text-success">{entry.points || 0}</strong></td>
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

export default Leaderboard;
