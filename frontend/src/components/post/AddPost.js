import { useEffect, useState } from "react";
import auth from './../../helper/auth-helper';
import theme from '../../theme';
import { makeStyles} from '@mui/styles';
import postService from "./../../service/post-service";
import PropsTypes from 'prop-types';


const useStyles = makeStyles({
    root: {
      backgroundColor: '#efefef',
      padding: `${theme.spacing(3)}px 0px 1px`
    },
    card: {
      maxWidth:600,
      margin: 'auto',
      marginBottom: theme.spacing(3),
      backgroundColor: 'rgba(65, 150, 136, 0.09)',
      boxShadow: 'none'
    },
    cardContent: {
      backgroundColor: 'white',
      paddingTop: 0,
      paddingBottom: 0
    },
    cardHeader: {
      paddingTop: 8,
      paddingBottom: 8
    },
    photoButton: {
      height: 30,
      marginBottom: 5
    },
    input: {
      display: 'none',
    },
    textField: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      width: '90%'
    },
    submit: {
      margin: theme.spacing(2)
    },
    filename:{
      verticalAlign: 'super'
    }
})

export default function AddPost(props){
    const classes = useStyles();
    const [values, setValues] = useState({
        text:'',
        photo:'',
        error:'',
        user: {}
    });

    useEffect(() => {
        setValues({...values, user: auth.isAuthenticated().user});
    }, [])

    const clickPost = () => {
        const jwt = auth.isAuthenticated();
        let postData = new FormData();
        postData.append('text', values.text);
        postData.append('photo', values.photo);

        postService.create({
            userId: jwt._id
        }, {t: jwt.token}, postData).then((data) => {
            if(data.error){
                setValues({...values, error: data.error});
            }else{
                setValues({...values, text:'', photo: ''});
                props.addUpdate(data);
            }
        })
    }
    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        setValues({...values, [name]: value});
    }
    return (
        <div></div>
    )
}

AddPost.propTypes = {addUpdate: PropsTypes.func.isRequired}