import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div>
      <div className="tracks-form-container">
        <h3>Welcome back to BlogIt!</h3>
        <form className="tracks-form">
          <div className="form-group">
            <label htmlFor="username" className="form-group-label">
              username or email
            </label>
            <input
              type="text"
              id="username"
              name="usernameOrEmail"
              className="form-group-input"
              placeholder="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-group-label">
              password
            </label>
            <input
              type="text"
              id="password"
              name="password"
              className="form-group-input"
              placeholder="password"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
          <div class="Signup-link">
            <p>
              Don't have an account?
              <Link to="/signup">Signup</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
