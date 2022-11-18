import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../../hooks/useRegister';
import './Register.css';

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const { email, password, confirmPassword } = userInfo;
  const { register } = useRegister();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(email, password, confirmPassword);
      navigate('/tickets');
    } catch (error) {
      const { message } = error;
      if (message === 'Email already exists') {
        setError(message + '. Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(message);
      }
    }
  };

  return (
    <div className="register-box">
      <div className="card card-outline card-primary">
        <div className="card-header">
          <Link to="/register" className="h1">
            <b>Register</b>
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">Register a new membership</p>
          {error && <div className="error-msg">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                className="form-control"
                name="email"
                onChange={handleChange}
                placeholder="Email"
                type="email"
                value={userInfo.email}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                className="form-control"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                type="password"
                value={userInfo.password}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                className="form-control"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Confirm password"
                type="password"
                value={userInfo.confirmPassword}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-8"></div>
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>
              </div>
            </div>
          </form>

          <Link to="/login" className="text-center">
            I already have a membership
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
