import { makeStyles} from '@mui/styles';
import {useEffect, useState} from 'react';
import theme from '../../theme';
import auth from './../../helper/auth-helper';
import userService from "./../../service/user-service";
import postService from "./../../service/post-service";
import {Redirect, Link} from 'react-router-dom';
import DeleteUser from './DeleteUser';
import {Edit} from '@mui/icons-material';


import { Avatar,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Paper, Typography } from '@mui/material';
import FollowProfileButton from './FollowProfileButton';
import ProfileTabs from './ProfileTabs';



const userStyles = makeStyles({
    root: {
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5)
    },
    title: {
        marginTop: theme.spacing(3),
        color: theme.palette.protectedTitle,
        fontSize: '1em'
    },
    bigAvatar: {
        width: 60,
        height: 60,
        margin: 10
    }
});

export default function Profile({match}) {
    const classes = userStyles();
    const [values, setValues] = useState({
        user: {
            following: [],
            followers: []
        },
        redirectToSignIn: false,
        following: false
    });
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const jwt = auth.isAuthenticated();

        userService.read({
            userId: match.params.userId
          }, {t: jwt.token}, signal).then((data) => {
            if (data && data.error) {
                setValues({...values, redirectToSignIn: true});
                //setRedirectToSignIn(true)
            } else {
                let following = checkFollow(data);
                setValues({...values, user: data, following: following});
                loadPosts(data._id);
            }
          })

        return function cleanup(){
          abortController.abort();
        }
      }, [match.params.userId])

      // Load all posts By USER
      const loadPosts = (user) => {
        const jwt = auth.isAuthenticated();
        postService.listByUser({
            userId: user
        }, {t: jwt.token}).then((data) => {
            if(data.error){
                console.log(data.error);
            }else{
                setPosts(data);
            }
        })
      }
      const clickFollowButton = (callApi) => {
        const jwt = auth.isAuthenticated();
        callApi({
            userId: jwt.user._id
        }, {t: jwt.token}, values.user._id).then((data) => {
            if(data.error){
                setValues({...values, error: data.error});
            }else{
                setValues({...values, user: data, following: !values.following});
            }
        })
      }
      const removePost = (post) => {
        const updatedPosts = posts;
        const index = updatedPosts.indexOf(post);
        updatedPosts.splice(index, 1);
        setPosts(updatedPosts);
      }

      const checkFollow = (user) => {
        const jwt = auth.isAuthenticated();
        const match = user.followers.some((follower) => {
            return follower._id === jwt.user._id;
        })
        return match;
      }

    if(values.redirectToSignIn){
        return <Redirect to='/login'/>
    }
    const photoUrl = values.user._id
              ? `/api/users/photo/${values.user._id}?${new Date().getTime()}`
              : '/api/users/defaultphoto';

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                Profile
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={photoUrl} className={classes.bigAvatar}/>
                    </ListItemAvatar>
                    <ListItemText primary={values.user.name} secondary={values.user.email}/>
                    {
                        auth.isAuthenticated().user && auth.isAuthenticated().user._id === values.user._id ?
                            ( <ListItemSecondaryAction>
                                <Link to={"/user/edit/" + values.user._id}>
                                    <IconButton arial-label="Edit" color="primary">
                                        <Edit/>
                                    </IconButton>
                                </Link>
                                <DeleteUser userId={values.user._id}/>
                            </ListItemSecondaryAction>)
                        : (<FollowProfileButton following={values.following} onButtonClick={clickFollowButton}/>)
                    }
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText primary={"Joined: " + (
                        new Date(values.user.created)).toDateString()}/>
                </ListItem>
            </List>
            <ProfileTabs user={values.user} posts={posts} removePostUpdate={removePost}/>
        </Paper>
    );
}
