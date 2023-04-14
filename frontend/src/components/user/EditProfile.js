import { useEffect, useState } from "react";
import { makeStyles} from '@mui/styles';
import theme from '../../theme';
import auth from './../../helper/auth-helper';
import userService from "./../../service/user-service";
import { Card, CardActions, CardContent, TextField,
    Button, Typography, Icon} from '@mui/material';



const useStyles = makeStyles({
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2)
    },
    title: {
      margin: theme.spacing(2),
      color: theme.palette.protectedTitle
    },
    error: {
      verticalAlign: 'middle'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing(2)
    }
  });

export default function EditProfile({match}){
    const classes = useStyles();
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: '',
        redirectToProfile: false
    });
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const jwt = auth.isAuthenticated();

        userService.read({
          userId: match.params.userId}, {t: jwt.token}, signal).then((data) => {
            if (data && data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, name: data.name, email: data.email})
                console.log(values);
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    }, [match.params.userId]);

    const clickSubmit = () => {
        const jwt = auth.isAuthenticated();
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
          }
          userService.update({
            userId: match.params.userId
          }, {
            t: jwt.token
          }, user).then((data) => {
            if (data && data.error) {
              setValues({...values, error: data.error});
            } else {
                setValues({...values, userId: data._id, redirectToProfile: true});
            }
          })
    }
    const handleChange = name => event => {
      setValues({...values, [name]: event.target.value});
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6" className={classes.title}>
                    Edit Profile
                </Typography>
                <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
                <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
                <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal" required={true}/>
                <br/> {
                    values.error && (<Typography component="p" color="error">
                    <Icon color="error" className={classes.error}>error</Icon>
                    {values.error}
                </Typography>)
                }
            </CardContent>
            <CardActions>
              <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
            </CardActions>
        </Card>
    );
}