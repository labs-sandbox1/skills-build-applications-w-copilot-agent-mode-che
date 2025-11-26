import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Fetching users from:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        console.log('Users response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Users data received:', data);
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        console.log('Processed users data:', usersData);
        setUsers(usersData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-5"><div className="alert alert-info text-center" role="alert"><div className="spinner-border text-primary me-2" role="status"><span className="visually-hidden">Loading...</span></div>Loading users...</div></div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger" role="alert"><strong>Error!</strong> {error}</div></div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4">👤 Users</h1>
        <span className="badge bg-primary rounded-pill fs-6">{users.length} Total</span>
      </div>
      <div className="card shadow-lg">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Team</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td><strong>{user.username}</strong></td>
                    <td><a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a></td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.team_name ? <span className="badge bg-success">{user.team_name}</span> : <span className="badge bg-secondary">No Team</span>}</td>
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

export default Users;
