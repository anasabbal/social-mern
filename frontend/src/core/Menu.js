import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import {Link} from 'react-router-dom';
import auth from './../helper/auth-helper';
import { withRouter } from "react-router";


const isActive = (pathname, path) => {
    return pathname === path ? { color: '#ff4081' } : { color: '#ffffff' };
  };
  
  const Menu = ({ history, location: { pathname } }) => {

    const handleLogout = () => {
      auth.clearJWT(() => {
        history.push("/");
      });
    };
  
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            MERN Skeleton
          </Typography>
          <Link to="/">
            <IconButton aria-label="Home" style={isActive(pathname, "/")}>
              
            </IconButton>
          </Link>
          <Link to="/users">
            <Button style={isActive(pathname, "/users")}>Users</Button>
          </Link>
          {auth.isAuthenticated() ? (
            <span>
              <Link to={`/user/${auth.isAuthenticated().user._id}`}>
                <Button style={isActive(pathname, `/user/${auth.isAuthenticated().user._id}`)}>My Profile</Button>
              </Link>
              <Button color="inherit" onClick={handleLogout}>Sign out</Button>
            </span>
          ) : (
            <span>
              <Link to="/register">
                <Button style={isActive(pathname, "/register")}>Sign up</Button>
              </Link>
              <Link to="/login">
                <Button style={isActive(pathname, "/login")}>Sign In</Button>
              </Link>
            </span>
          )}
        </Toolbar>
      </AppBar>
    );
  };
  
export default withRouter(Menu);