import { makeStyles} from '@mui/styles';
import {useEffect, useState} from 'react';
import theme from '../theme';
import auth from './../helper/auth-helper';
import userService from '../service/user-service';
import {Redirect, Link} from 'react-router-dom';
import DeleteUser from './DeleteUser';
import { Avatar,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Paper, Typography } from '@mui/material';



const userStyles = makeStyles({
    root: {
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5)
    },
    title: {
        marginTop: theme.spacing(3),
        color: theme.palette.protectedTitle
    }
});

export default function Profile({match}) {
    const classes = userStyles();
    const [user, setUser] = useState({});
    const [redirectToSignIn, setRedirectToSignIn] = useState(false);


    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const jwt = auth.isAuthenticated();

        userService.read({
            userId: match.params.userId
          }, {t: jwt.token}, signal).then((data) => {
            if (data && data.error) {
                setRedirectToSignIn(true)
            } else {
                console.log(data);
                setUser(data);
            }
          })

        return function cleanup(){
          abortController.abort();
        }
      }, [match.params.userId])

    if(redirectToSignIn)
        return <Redirect to='/login'/>

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                Profile
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>

                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email}/>
                    {
                        auth.isAuthenticated().user && auth.isAuthenticated().user._id === user._id && (
                            <ListItemSecondaryAction>
                                <Link to={"/usr/edit/" + user._id}>
                                    <IconButton arial-label="Edit" color="primary">

                                    </IconButton>
                                </Link>
                                <DeleteUser userId={user._id}/>
                            </ListItemSecondaryAction>
                        )
                    }
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText primary={"Joined: " + (
                        new Date(user.created)).toDateString()}/>
                </ListItem>
            </List>
        </Paper>
    );
}
