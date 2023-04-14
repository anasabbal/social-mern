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
          <Typography 
              variant="h6" 
              color="inherit">
            MERN Skeleton
          </Typography>
          <Link to="/">
            <IconButton 
                aria-label="Home" 
                style={isActive(pathname, "/")}>
            </IconButton>
          </Link>
          {!auth.isAuthenticated() && (

            <span>
              <Link to="/register">
                <Button 
                    style={isActive(pathname, "/register")}>
                      Sign up
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                    style={isActive(pathname, "/login")}>
                      Sign In
                </Button>
              </Link>
            </span>
          )}
          {
            auth.isAuthenticated() && (<span>
                <Link to='/users'>
                    <Button style={isActive(history, "/users")}>Users</Button>
                </Link>
                <Link to={"/user/" + auth.isAuthenticated().user._id}>
                    <Button 
                        style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>
                          My Profile
                    </Button>
                </Link>
                <Button color="inherit" onClick={() => {
                    auth.clearJWT(() => history.push('/'))
                    }}>Sign out</Button>
                </span>)
          }
        </Toolbar>
      </AppBar>
    );
  };
  
export default withRouter(Menu);