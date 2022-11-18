import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import './Login.css';

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const { email, password } = userInfo;
  const [error, setError] = useState('');
  const { login } = useLogin();
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
      await login(email, password);
      navigate('/tickets');
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <a href="../../index2.html" className="h1">
            <b>Log in</b>
          </a>
        </div>
        <div className="card-body">
          <p className="login-box-msg">Sign in to start your session</p>
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
            <div className="row">
              <div className="col-8"></div>
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">
                  Log in
                </button>
              </div>
            </div>
          </form>
          <p className="mb-0">
            <Link to="/register" className="text-center">
              Register a new membership
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
