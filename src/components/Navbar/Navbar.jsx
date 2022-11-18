import { Link, Outlet } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import logo from '../../assets/logo.jpeg';
import { useAuthContext } from '../../hooks/useAuthContext';

import './Navbar.css';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src={logo} width="180" height="180" alt="ServiPlus Logo" />
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            {user && (
              <>
                <Link className="navbar-item" to="/tickets">
                  Tickets
                </Link>

                <Link className="navbar-item" to="/tickets/new">
                  New Ticket
                </Link>
              </>
            )}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {user && (
                  <Link
                    className="button is-light"
                    to="login"
                    onClick={handleClick}
                  >
                    Log out
                  </Link>
                )}
                {!user && (
                  <>
                    <Link className="button is-primary" to="register">
                      <strong>Sign up</strong>
                    </Link>
                    <Link className="button is-light" to="login">
                      Log in
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
