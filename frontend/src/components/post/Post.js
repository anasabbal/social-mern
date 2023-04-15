import PropTypes from 'prop-types';
import auth from './../../helper/auth-helper';
import theme from '../../theme';
import { makeStyles} from '@mui/styles';
import { useState } from 'react';
import postService from "./../../service/post-service";


const useStyles = makeStyles({
    card: {
      maxWidth:600,
      margin: 'auto',
      marginBottom: theme.spacing(3),
      backgroundColor: 'rgba(0, 0, 0, 0.06)'
    },
    cardContent: {
      backgroundColor: 'white',
      padding: `${theme.spacing(2)}px 0px`
    },
    cardHeader: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    text: {
      margin: theme.spacing(2)
    },
    photo: {
      textAlign: 'center',
      backgroundColor: '#f2f5f4',
      padding:theme.spacing(1)
    },
    media: {
      height: 200
    },
    button: {
     margin: theme.spacing(1),
    }
});

export default function Post(props){
    const classes = useStyles();
    const jwt = auth.isAuthenticated();

    const checkLike = (likes) => {
        let match = likes.indexOf(jwt.user._id) !== - 1
        return match;
    }
    const [values, setValues] = useState({
        like: checkLike(props.post.likes),
        likes: props.post.likes.length,
        comments: props.post.comments
    });
    const updateComments = (comments) => {
        setValues({...values, comments: comments});
    }
    const deletePost = () => {
        
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired
}