import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';
import logo from './octofitapp-small.png';

function Home() {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-3 fw-bold">Welcome to OctoFit Tracker</h1>
        <p className="lead fs-4 mt-3">
          Track your fitness journey, compete with your team, and achieve your goals!
        </p>
        <div className="mt-4">
          <a href="/activities" className="btn btn-primary btn-lg me-3">Get Started</a>
          <a href="/leaderboard" className="btn btn-outline-light btn-lg">View Leaderboard</a>
        </div>
      </div>
      
      <div className="row mt-5 g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-lg border-0">
            <div className="card-header bg-gradient text-center py-3">
              <h5 className="mb-0 fs-4 text-dark">🏃 Track Activities</h5>
            </div>
            <div className="card-body text-center">
              <p className="card-text text-muted mb-4">
                Log your workouts and monitor your progress over time with detailed analytics.
              </p>
              <a href="/activities" className="btn btn-primary">View Activities</a>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card h-100 shadow-lg border-0">
            <div className="card-header bg-gradient text-center py-3">
              <h5 className="mb-0 fs-4 text-dark">👥 Join Teams</h5>
            </div>
            <div className="card-body text-center">
              <p className="card-text text-muted mb-4">
                Connect with others and compete together as a team to reach new heights.
              </p>
              <a href="/teams" className="btn btn-success">Explore Teams</a>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card h-100 shadow-lg border-0">
            <div className="card-header bg-gradient text-center py-3">
              <h5 className="mb-0 fs-4 text-dark">🏆 Compete</h5>
            </div>
            <div className="card-body text-center">
              <p className="card-text text-muted mb-4">
                Check the leaderboard and see how you rank against others in real-time.
              </p>
              <a href="/leaderboard" className="btn btn-warning">View Rankings</a>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5 mb-5">
        <div className="col-12">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <h2 className="text-center mb-4 text-dark">💪 Featured Workouts</h2>
              <div className="row text-center">
                <div className="col-md-3">
                  <div className="p-3">
                    <span className="badge bg-primary fs-5 mb-2">Running</span>
                    <p className="text-muted small">Cardio exercises for endurance</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3">
                    <span className="badge bg-success fs-5 mb-2">Strength</span>
                    <p className="text-muted small">Build muscle and power</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3">
                    <span className="badge bg-warning text-dark fs-5 mb-2">Yoga</span>
                    <p className="text-muted small">Flexibility and balance</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3">
                    <span className="badge bg-info text-dark fs-5 mb-2">HIIT</span>
                    <p className="text-muted small">High-intensity intervals</p>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <a href="/workouts" className="btn btn-outline-primary btn-lg">Browse All Workouts</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              <img src={logo} alt="OctoFit Logo" className="App-logo" />
              OctoFit Tracker
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">
                    Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/teams">
                    Teams
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/activities">
                    Activities
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/workouts">
                    Workouts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/leaderboard">
                    Leaderboard
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

