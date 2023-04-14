import { makeStyles} from '@mui/styles';
import {useState, useEffect} from 'react';
import theme from '../../theme';
import userService from "./../../service/user-service";
import { Avatar, 
    List, 
    ListItem, 
    ListItemText, 
    Paper, Typography, ListItemAvatar, ListItemSecondaryAction, IconButton } from "@mui/material";
import {Link} from 'react-router-dom';



const useStyles = makeStyles({
    root: {
        padding: theme.spacing(1),
        margin: theme.spacing(5)
    },
    title: {
      margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
      color: theme.palette.openTitle
    }
  });

export default function UserList () {
    const classes = useStyles();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        userService.list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error);
            } else {
                console.log(data.data);
                setUsers(data);
            } 
        }).catch((error) => {
            console.log(error);
        })

        return function cleanup(){
        abortController.abort();
        }
    }, [])

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                All Users
            </Typography>
            <List dense>
                {users.map((item, i) => {
                    return <Link to={"/user/" + item._id} key={i}>
                        <ListItem button>
                           <ListItemAvatar>
                                <Avatar>

                                </Avatar>
                           </ListItemAvatar>
                           <ListItemText primary={item.name}/>
                           <ListItemSecondaryAction>
                                <IconButton>
                                    
                                </IconButton>
                           </ListItemSecondaryAction>
                        </ListItem>
                    </Link>
                })}
            </List>
        </Paper>
    );
}